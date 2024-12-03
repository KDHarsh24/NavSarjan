import express from "express";
import { demo } from "../Controller/startUpController.js";

const router = express.Router();

router.get('/',demo);

export default router;

/*
    method of writing 
    router.method('path',Controoler);

*/