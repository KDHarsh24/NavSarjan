import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { ApiError } from "../utils/ApiError.js";

const isBlank = (value) => value === undefined || value === null || value === "";

export const validateBody = (requiredFields, message = MESSAGES.VALIDATION.INVALID_INPUT) => (req, _res, next) => {
    const body = req.body || {};
    const missing = requiredFields.filter((field) => isBlank(body[field]));

    if (missing.length > 0) {
        return next(new ApiError(HTTP_STATUS.BAD_REQUEST, message, { missingFields: missing }));
    }

    return next();
};
