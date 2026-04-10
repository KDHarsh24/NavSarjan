import { MESSAGES } from "../constants/messages.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export class DataController {
    constructor({ dataService }) {
        this.dataService = dataService;
    }

    insert = asyncHandler(async (req, res) => {
        const { collectionName, data } = req.body;
        const result = await this.dataService.insert({
            collectionName,
            data,
            user: req.user,
        });

        if (!result.ok && result.code === "DUPLICATE_DOCUMENT") {
            throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.CRUD.DUPLICATE_DOC);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.CRUD.INSERT_SUCCESS,
            result: result.result,
        });
    });

    fetch = asyncHandler(async (req, res) => {
        const { collectionName, condition, projection, searchText, filters, metrics, page, pageSize } = req.body;

        const data = await this.dataService.fetch({
            collectionName,
            condition: condition || {},
            projection: projection || {},
            searchText: searchText || "",
            filters: filters || {},
            metrics: metrics || {},
            page,
            pageSize,
            user: req.user,
        });

        return res.status(HTTP_STATUS.OK).json({ success: true, data });
    });

    fetchOne = asyncHandler(async (req, res) => {
        const { collectionName, condition, projection } = req.body;

        const data = await this.dataService.fetchOne({
            collectionName,
            condition: condition || {},
            projection: projection || {},
            user: req.user,
        });

        return res.status(HTTP_STATUS.OK).json({ success: true, data });
    });

    replace = asyncHandler(async (req, res) => {
        const { collectionName, condition, data } = req.body;

        const result = await this.dataService.replace({
            collectionName,
            condition,
            data,
            user: req.user,
        });

        if (!result.ok) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CRUD.NOT_FOUND);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.CRUD.REPLACE_SUCCESS,
            result: result.result,
        });
    });

    invest = asyncHandler(async (req, res) => {
        const { collectionName, entityId, amount } = req.body;

        const result = await this.dataService.invest({
            collectionName,
            entityId,
            amount,
            user: req.user,
        });

        if (!result.ok && result.code === "NOT_FOUND") {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.CRUD.NOT_FOUND);
        }

        if (!result.ok && result.code === "INVALID_COLLECTION") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.CRUD.INVALID_INVEST_COLLECTION);
        }

        if (!result.ok && result.code === "INVALID_AMOUNT") {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.CRUD.INVALID_INVEST_AMOUNT);
        }

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: MESSAGES.CRUD.INVEST_SUCCESS,
            result: result.result,
        });
    });
}
