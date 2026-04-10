import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { MESSAGES } from "../constants/messages.js";
import { getDependencies } from "../bootstrap/dependencyContainer.js";

export const buildDataRoutes = () => {
    const { dataController, authMiddleware } = getDependencies();
    const router = express.Router();

    router.post(
        "/insert",
        authMiddleware.requireAuth,
        validateBody(["collectionName", "data"], MESSAGES.VALIDATION.MISSING_COLLECTION_OR_DATA),
        dataController.insert
    );
    router.post(
        "/fetch",
        authMiddleware.requireAuth,
        validateBody(["collectionName"], MESSAGES.VALIDATION.COLLECTION_REQUIRED),
        dataController.fetch
    );
    router.post(
        "/fetchone",
        authMiddleware.requireAuth,
        validateBody(["collectionName"], MESSAGES.VALIDATION.COLLECTION_REQUIRED),
        dataController.fetchOne
    );
    router.post(
        "/replace",
        authMiddleware.requireAuth,
        validateBody(["collectionName", "condition", "data"], MESSAGES.VALIDATION.INVALID_INPUT),
        dataController.replace
    );
    router.post(
        "/invest",
        authMiddleware.requireAuth,
        validateBody(["collectionName", "entityId", "amount"], MESSAGES.VALIDATION.MISSING_INVESTMENT_FIELDS),
        dataController.invest
    );

    return router;
};
