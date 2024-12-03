import express from "express";
import { dashboardDetail } from "../Controller/startUpController.js"; // Ensure this controller is properly implemented

const router = express.Router();

// Route to fetch startup details
router.get('/detail', dashboardDetail); // Correctly links the route to the controller function

export default router;

/*
    Router methods:
    router.method('path', ControllerFunction);
*/