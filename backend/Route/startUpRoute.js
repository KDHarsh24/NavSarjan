import express from "express";
import { dashboardDetail } from "../Controller/startUpController.js";

const router = express.Router();

router.get('/detail',dashboardDetail);


export default router;

/*
    method of writing 
    router.method('path',Controoler);

*/