import express from "express";
import { getContacts, getMessages, updateReadStatus } from "../Controller/chatController.js";

const router = express.Router();

router.get("/contact", getContacts);
router.get("/message", getMessages);
router.post("/readStatus", updateReadStatus);

export default router;