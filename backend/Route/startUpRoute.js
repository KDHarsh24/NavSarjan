import express from "express";
import { mystartupDetail, startupDetail,userProfileDetail, newStartUpDetail} from "../Controller/startUpController.js"; 

const router = express.Router();

// Route to fetch startup details
router.get('/startup/detail', startupDetail); 
router.post('/mystartup/detail', mystartupDetail);
router.get('/profileDetail',userProfileDetail);
router.post('/newStartUp',newStartUpDetail);

export default router;