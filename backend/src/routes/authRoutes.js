import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { MESSAGES } from "../constants/messages.js";
import { getDependencies } from "../bootstrap/dependencyContainer.js";

export const buildAuthRoutes = () => {
    const { authController, rateLimiters } = getDependencies();
    const { authLimiter } = rateLimiters;
    const router = express.Router();

    router.post(
        "/login",
        authLimiter,
        validateBody(["email", "password"], MESSAGES.VALIDATION.EMAIL_PASSWORD_REQUIRED),
        authController.login
    );
    router.post(
        "/register",
        authLimiter,
        validateBody(["name", "email", "password", "address", "phone", "dob", "role"], MESSAGES.VALIDATION.ALL_FIELDS_REQUIRED),
        authController.register
    );
    router.post(
        "/register/free",
        authLimiter,
        validateBody(["name", "email", "password", "address", "phone", "dob", "role"], MESSAGES.VALIDATION.ALL_FIELDS_REQUIRED),
        authController.registerFree
    );
    router.post(
        "/forgot-password",
        authLimiter,
        validateBody(["email"], MESSAGES.VALIDATION.EMAIL_REQUIRED),
        authController.forgotPassword
    );
    router.post(
        "/reset-password",
        authLimiter,
        validateBody(["email", "resetToken", "newPassword"], MESSAGES.VALIDATION.EMAIL_TOKEN_PASSWORD_REQUIRED),
        authController.resetPassword
    );
    router.post(
        "/refresh",
        authLimiter,
        validateBody(["refreshToken"], MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED),
        authController.refresh
    );
    router.post(
        "/logout",
        validateBody(["refreshToken"], MESSAGES.AUTH.REFRESH_TOKEN_REQUIRED),
        authController.logout
    );

    return router;
};
