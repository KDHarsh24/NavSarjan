import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { ApiError } from "../utils/ApiError.js";

export const notFoundHandler = (req, _res, next) => {
    next(new ApiError(HTTP_STATUS.NOT_FOUND, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    const message = err?.message || MESSAGES.GENERAL.INTERNAL_SERVER_ERROR;

    if (statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        console.error("Unhandled error:", err);
    }

    const payload = {
        success: false,
        message,
    };

    if (err?.details) {
        payload.details = err.details;
    }

    res.status(statusCode).json(payload);
};
