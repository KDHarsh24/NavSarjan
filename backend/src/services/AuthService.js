import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { PUBLIC_REGISTRATION_ROLES, normalizeRole } from "../constants/roles.js";

export class AuthService {
    constructor({
        userModel,
        historyService,
        authSessionModel,
        jwtSecret,
        tokenExpiresIn = "15m",
        refreshSecret,
        refreshTokenExpiresIn = "7d",
        maxActiveSessionsPerUser = 5,
    }) {
        this.userModel = userModel;
        this.historyService = historyService;
        this.authSessionModel = authSessionModel;
        this.jwtSecret = jwtSecret;
        this.tokenExpiresIn = tokenExpiresIn;
        this.refreshSecret = refreshSecret;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
        this.maxActiveSessionsPerUser = maxActiveSessionsPerUser;
    }

    getRefreshExpiryDate() {
        const value = String(this.refreshTokenExpiresIn).trim();
        const amount = Number.parseInt(value.slice(0, -1), 10);
        const unit = value.slice(-1);

        if (Number.isNaN(amount)) {
            return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        }

        const multipliers = {
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };

        const duration = multipliers[unit] || multipliers.d;
        return new Date(Date.now() + amount * duration);
    }

    async enforceSessionLimit(userId) {
        const activeSessions = await this.authSessionModel.getActiveSessionsByUser(userId);

        if (activeSessions.length < this.maxActiveSessionsPerUser) {
            return;
        }

        const sessionsToRevoke = activeSessions.slice(
            0,
            activeSessions.length - this.maxActiveSessionsPerUser + 1
        );

        await Promise.all(
            sessionsToRevoke.map((session) =>
                this.authSessionModel.revokeSessionById(session.sessionId)
            )
        );
    }

    generateToken(user) {
        return jwt.sign(
            {
                sub: String(user.id),
                email: user.email,
                name: user.name,
                role: user.role,
            },
            this.jwtSecret,
            { expiresIn: this.tokenExpiresIn }
        );
    }

    generateRefreshToken({ user, sessionId }) {
        return jwt.sign(
            {
                sub: String(user.id),
                email: user.email,
                name: user.name,
                role: user.role,
                sid: sessionId,
                typ: "refresh",
            },
            this.refreshSecret,
            { expiresIn: this.refreshTokenExpiresIn }
        );
    }

    verifyToken(token) {
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return {
                ok: true,
                user: {
                    id: payload.sub,
                    email: payload.email,
                    name: payload.name,
                    role: payload.role,
                },
            };
        } catch (_error) {
            return { ok: false };
        }
    }

    verifyRefreshToken(token) {
        try {
            const payload = jwt.verify(token, this.refreshSecret);
            if (payload.typ !== "refresh" || !payload.sid) {
                return { ok: false };
            }

            return {
                ok: true,
                sessionId: payload.sid,
                user: {
                    id: payload.sub,
                    email: payload.email,
                    name: payload.name,
                    role: payload.role,
                },
            };
        } catch (_error) {
            return { ok: false };
        }
    }

    async createSession(user, metadata = {}) {
        await this.enforceSessionLimit(user.id);

        const sessionId = randomUUID();
        await this.authSessionModel.insertOne({
            sessionId,
            userId: String(user.id),
            email: user.email,
            createdAt: new Date(),
            expiresAt: this.getRefreshExpiryDate(),
            revokedAt: null,
            userAgent: metadata.userAgent || null,
            ip: metadata.ip || null,
        });
        return sessionId;
    }

    async buildAuthTokens(user, metadata = {}) {
        const sessionId = await this.createSession(user, metadata);
        const token = this.generateToken(user);
        const refreshToken = this.generateRefreshToken({ user, sessionId });
        return { token, refreshToken, sessionId };
    }

    async login({ email, password, metadata = {} }) {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return { ok: false, code: "USER_NOT_FOUND" };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return { ok: false, code: "INVALID_PASSWORD" };
        }

        const safeUser = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const tokens = await this.buildAuthTokens(safeUser, metadata);

        return {
            ok: true,
            user: safeUser,
            ...tokens,
        };
    }

    async register(payload) {
        const {
            name,
            email,
            password,
            address,
            phone,
            dob,
            social,
            role,
            image,
            accountType = "free",
            metadata = {},
        } = payload;

        const normalizedRole = normalizeRole(role);
        if (!PUBLIC_REGISTRATION_ROLES.includes(normalizedRole)) {
            return { ok: false, code: "INVALID_ROLE" };
        }

        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            return { ok: false, code: "EMAIL_EXISTS" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            password: hashedPassword,
            address,
            phone,
            dob,
            image: image || null,
            social: social || null,
            role: normalizedRole,
            accountType,
        };

        const result = await this.userModel.insertOne(newUser);

        await this.historyService.logHistory({
            entityType: "user",
            entityId: email,
            fieldChanged: "Account Regitered",
            changedBy: email,
        });

        const safeUser = {
            id: result.insertedId,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            accountType: newUser.accountType,
        };

        const tokens = await this.buildAuthTokens(safeUser, metadata);

        return {
            ok: true,
            user: safeUser,
            ...tokens,
        };
    }

    async forgotPassword({ email }) {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return { ok: true };
        }

        const resetToken = randomUUID();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await this.userModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    passwordResetToken: resetToken,
                    passwordResetExpiresAt: expiresAt,
                },
            }
        );

        return { ok: true, resetToken };
    }

    async resetPassword({ email, resetToken, newPassword }) {
        const user = await this.userModel.findOne({ email });

        if (!user || user.passwordResetToken !== resetToken) {
            return { ok: false, code: "INVALID_RESET_TOKEN" };
        }

        if (!user.passwordResetExpiresAt || new Date(user.passwordResetExpiresAt) < new Date()) {
            return { ok: false, code: "RESET_TOKEN_EXPIRED" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.userModel.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                },
                $unset: {
                    passwordResetToken: "",
                    passwordResetExpiresAt: "",
                },
            }
        );

        await this.historyService.logHistory({
            entityType: "user",
            entityId: email,
            fieldChanged: "Password Reset",
            changedBy: email,
        });

        return { ok: true };
    }

    async refresh(refreshToken) {
        const verified = this.verifyRefreshToken(refreshToken);
        if (!verified.ok) {
            return { ok: false, code: "INVALID_TOKEN" };
        }

        const activeSession = await this.authSessionModel.findOne({
            sessionId: verified.sessionId,
            userId: String(verified.user.id),
            revokedAt: null,
        });

        if (!activeSession) {
            return { ok: false, code: "INVALID_TOKEN" };
        }

        const token = this.generateToken(verified.user);
        const nextRefreshToken = this.generateRefreshToken({
            user: verified.user,
            sessionId: verified.sessionId,
        });

        return {
            ok: true,
            token,
            refreshToken: nextRefreshToken,
            user: verified.user,
        };
    }

    async logout(refreshToken) {
        const verified = this.verifyRefreshToken(refreshToken);
        if (!verified.ok) {
            return { ok: true };
        }

        await this.authSessionModel.updateOne(
            { sessionId: verified.sessionId, userId: String(verified.user.id), revokedAt: null },
            { $set: { revokedAt: new Date() } }
        );

        return { ok: true };
    }
}
