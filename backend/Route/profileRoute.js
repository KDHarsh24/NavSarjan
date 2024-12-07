import express from "express";
import {userProfileData}  from "../Controller/profileController.js";

const router=express.Router();

router.post('/',userProfileData);



export default router;

