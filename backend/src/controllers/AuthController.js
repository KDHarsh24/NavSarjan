import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class AuthController {
    constructor({ authService }) {
        this.authService = authService;
    }

    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const result = await this.authService.login({
            email,
            password,
            metadata: {
                userAgent: req.headers["user-agent"],
                ip: req.ip,
            },
        });

        if (!result.ok && result.code === "USER_NOT_FOUND") {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AUTH.USER_NOT_FOUND);
        }

        if (!result.ok && result.code === "INVALID_PASSWORD") {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_PASSWORD);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.AUTH.LOGIN_SUCCESS,
            token: result.token,
            refreshToken: result.refreshToken,
            data: result.user,
        });
    });

    register = asyncHandler(async (req, res) => {
        const { name, email, password, address, phone, dob, social, role, accountType } = req.body;

        const result = await this.authService.register({
            name,
            email,
            password,
            address,
            phone,
            dob,
            social,
            role,
            accountType,
            image: req.file ? req.file.path : null,
            metadata: {
                userAgent: req.headers["user-agent"],
                ip: req.ip,
            },
        });

        if (!result.ok && result.code === "EMAIL_EXISTS") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.EMAIL_EXISTS);
        }

        if (!result.ok && result.code === "INVALID_ROLE") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.INVALID_ROLE);
        }

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: MESSAGES.AUTH.ACCOUNT_CREATED,
            token: result.token,
            refreshToken: result.refreshToken,
            user: result.user,
        });
    });

    registerFree = asyncHandler(async (req, res) => {
        const { name, email, password, address, phone, dob, social, role } = req.body;

        const result = await this.authService.register({
            name,
            email,
            password,
            address,
            phone,
            dob,
            social,
            role,
            accountType: "free",
            image: req.file ? req.file.path : null,
            metadata: {
                userAgent: req.headers["user-agent"],
                ip: req.ip,
            },
        });

        if (!result.ok && result.code === "EMAIL_EXISTS") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.EMAIL_EXISTS);
        }

        if (!result.ok && result.code === "INVALID_ROLE") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.INVALID_ROLE);
        }

        return res.status(HTTP_STATUS.CREATED).json({
            success: true,
            message: MESSAGES.AUTH.FREE_ACCOUNT_CREATED,
            token: result.token,
            refreshToken: result.refreshToken,
            user: result.user,
        });
    });

    forgotPassword = asyncHandler(async (req, res) => {
        const { email } = req.body;
        const result = await this.authService.forgotPassword({ email });

        const payload = {
            success: true,
            message: MESSAGES.AUTH.PASSWORD_RESET_REQUESTED,
        };

        if (process.env.NODE_ENV !== "production" && result?.resetToken) {
            payload.resetToken = result.resetToken;
        }

        return res.status(HTTP_STATUS.OK).json(payload);
    });

    resetPassword = asyncHandler(async (req, res) => {
        const { email, resetToken, newPassword } = req.body;
        const result = await this.authService.resetPassword({ email, resetToken, newPassword });

        if (!result.ok && result.code === "INVALID_RESET_TOKEN") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.INVALID_RESET_TOKEN);
        }

        if (!result.ok && result.code === "RESET_TOKEN_EXPIRED") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.AUTH.RESET_TOKEN_EXPIRED);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.AUTH.PASSWORD_RESET_SUCCESS,
        });
    });

    refresh = asyncHandler(async (req, res) => {
        const { refreshToken } = req.body;
        const result = await this.authService.refresh(refreshToken);

        if (!result.ok) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.INVALID_TOKEN);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.AUTH.REFRESH_SUCCESS,
            token: result.token,
            refreshToken: result.refreshToken,
            data: result.user,
        });
    });

    logout = asyncHandler(async (req, res) => {
        const { refreshToken } = req.body;
        await this.authService.logout(refreshToken);

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.AUTH.LOGOUT_SUCCESS,
        });
    });
}
