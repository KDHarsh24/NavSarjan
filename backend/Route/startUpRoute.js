import express from "express";
import { dashboardDetail,userProfileDetail } from "../Controller/startUpController.js"; 

const router = express.Router();

// Route to fetch startup details
router.get('/detail', dashboardDetail); 
router.get('/profileDetail',userProfileDetail);


export default router;