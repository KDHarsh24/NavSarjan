import { rateLimit } from "express-rate-limit";

const jsonRateLimitHandler = (message) => (_req, res, _next, options) => {
    const retryAfterSeconds = Math.ceil(options.windowMs / 1000);
    res.status(options.statusCode).json({
        success: false,
        message,
        retryAfterSeconds,
    });
};

export const buildRateLimiters = ({
    apiWindowMs = 60_000,
    apiMaxRequests = 120,
    authWindowMs = 15 * 60_000,
    authMaxRequests = 20,
    apiMessage,
    authMessage,
}) => {
    const apiLimiter = rateLimit({
        windowMs: apiWindowMs,
        max: apiMaxRequests,
        standardHeaders: true,
        legacyHeaders: false,
        handler: jsonRateLimitHandler(apiMessage),
    });

    const authLimiter = rateLimit({
        windowMs: authWindowMs,
        max: authMaxRequests,
        standardHeaders: true,
        legacyHeaders: false,
        handler: jsonRateLimitHandler(authMessage),
    });

    return {
        apiLimiter,
        authLimiter,
    };
};
