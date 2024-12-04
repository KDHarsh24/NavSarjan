import express from "express";
import { dashboardDetail,userProfileDetail, newStartUpDetail} from "../Controller/startUpController.js"; 

const router = express.Router();

// Route to fetch startup details
router.get('/detail', dashboardDetail); 
router.get('/profileDetail',userProfileDetail);
router.post('/newStartUp',newStartUpDetail);

export default router;