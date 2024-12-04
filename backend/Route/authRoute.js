import express from "express";
import {userRegister,userLogin,checkUser,newUser} from "../Controller/userAuthController.js"; 



const router = express.Router();

router.post('/register',userRegister);
router.post('/login',userLogin);
router.get('/userExist',checkUser);
router.post('/newUserData',newUser);

export default router;








