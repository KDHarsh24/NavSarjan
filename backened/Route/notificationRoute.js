import express from "express";
import { getNotifications, removeNotification } from "../Controller/notificationController.js";

const router = express.Router();

router.get("/", getNotifications);
router.post("/removeNotify", removeNotification);

export default router;
