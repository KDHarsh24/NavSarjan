import express from "express";
import { validateRequestFields } from "../middlewares/validateRequestFields.js";
import { MESSAGES } from "../constants/messages.js";
import { getDependencies } from "../bootstrap/dependencyContainer.js";

export const buildChatRoutes = () => {
    const { chatController, authMiddleware } = getDependencies();
    const router = express.Router();

    router.get("/chat/contact", authMiddleware.requireAuth, authMiddleware.requireSelf(["user"]), validateRequestFields(["user"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.getContacts);
    router.post("/chat/contact", authMiddleware.requireAuth, authMiddleware.requireSelf(["user"]), validateRequestFields(["user", "contact"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.addContact);
    router.get("/chat/message", authMiddleware.requireAuth, authMiddleware.requireSelf(["from"]), validateRequestFields(["from", "to"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.getMessages);
    router.post("/chat/readStatus", authMiddleware.requireAuth, validateRequestFields(["contact"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.markReadStatus);

    router.get("/notification", authMiddleware.requireAuth, authMiddleware.requireSelf(["user"]), validateRequestFields(["user"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.getNotifications);
    router.post("/notification/removeNotify", authMiddleware.requireAuth, authMiddleware.requireSelf(["user"]), validateRequestFields(["source", "priority", "user"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.removeNotification);

    // Backward-compatible alias used by current frontend implementation.
    router.post("/chat/removeNotify", authMiddleware.requireAuth, authMiddleware.requireSelf(["user"]), validateRequestFields(["source", "priority", "user"], MESSAGES.VALIDATION.INVALID_INPUT), chatController.removeNotification);

    return router;
};
