import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { ApiError } from "../utils/ApiError.js";
import { getParam } from "../utils/request.js";

const isBlank = (value) => value === undefined || value === null || value === "";

export const validateRequestFields = (requiredFields, message = MESSAGES.VALIDATION.INVALID_INPUT) => (req, _res, next) => {
    const missing = requiredFields.filter((field) => isBlank(getParam(req, field)));

    if (missing.length > 0) {
        return next(new ApiError(HTTP_STATUS.BAD_REQUEST, message, { missingFields: missing }));
    }

    return next();
};
