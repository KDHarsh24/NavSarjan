import express from "express";
import {userRegister,userLogin} from "../Controller/userAuthController.js"; 



const router = express.Router();

router.post('/register');
router.post('/login');


export default router;








