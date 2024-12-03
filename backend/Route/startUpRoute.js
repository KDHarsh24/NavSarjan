import express from "express";
import { dashboardDetail } from "../Controller/startUpController.js";

const router = express.Router();

// Route to fetch startup details
router.get('/detail', dashboardDetail); // Correctly links the route to the controller function

export default router;