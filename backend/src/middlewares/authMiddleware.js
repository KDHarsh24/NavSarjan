import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { ROLES, normalizeRole } from "../constants/roles.js";
import { ApiError } from "../utils/ApiError.js";
import { getParam } from "../utils/request.js";

const extractTokenFromRequest = (req) => {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    return headerToken || req.headers?.["x-access-token"] || req.query?.token || null;
};

const extractTokenFromSocket = (socket) => {
    const authToken = socket.handshake?.auth?.token;
    if (authToken) {
        return authToken;
    }

    const authHeader = socket.handshake?.headers?.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.slice(7);
    }

    return null;
};

export const buildAuthMiddleware = ({ authService }) => {
    const isElevatedRole = (role) => {
        const normalized = normalizeRole(role);
        return normalized === ROLES.ADMIN || normalized === ROLES.POLICY_MAKER;
    };

    const requireAuth = (req, _res, next) => {
        const token = extractTokenFromRequest(req);

        if (!token) {
            return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.TOKEN_REQUIRED));
        }

        const verification = authService.verifyToken(token);
        if (!verification.ok) {
            return next(new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_TOKEN));
        }

        req.user = verification.user;
        return next();
    };

    const requireRole = (...roles) => {
        const allowedRoles = roles.map(normalizeRole);

        return (req, _res, next) => {
            const userRole = normalizeRole(req.user?.role);

            if (!allowedRoles.includes(userRole)) {
                return next(new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN));
            }

            return next();
        };
    };

    const requireSelf = (fieldNames = []) => {
        const safeFieldNames = Array.isArray(fieldNames) ? fieldNames : [fieldNames];

        return (req, _res, next) => {
            if (isElevatedRole(req.user?.role)) {
                return next();
            }

            const requester = String(req.user?.email || "").trim().toLowerCase();
            if (!requester) {
                return next(new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN));
            }

            const isAllowed = safeFieldNames.some((field) => {
                const value = getParam(req, field);
                return String(value || "").trim().toLowerCase() === requester;
            });

            if (!isAllowed) {
                return next(new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN));
            }

            return next();
        };
    };

    const requireSocketAuth = (socket, next) => {
        const token = extractTokenFromSocket(socket);

        if (!token) {
            return next(new Error(MESSAGES.AUTH.TOKEN_REQUIRED));
        }

        const verification = authService.verifyToken(token);
        if (!verification.ok) {
            return next(new Error(MESSAGES.AUTH.INVALID_TOKEN));
        }

        socket.user = verification.user;
        return next();
    };

    return {
        requireAuth,
        requireRole,
        requireSelf,
        requireSocketAuth,
    };
};
