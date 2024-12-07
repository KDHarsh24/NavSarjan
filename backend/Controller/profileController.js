import { query } from "express";
import User from "../model/user.js";


export const userProfileData=async(req,res)=>
{
    const email=req.body.email;
    console.log("email: "+email);
    try
    {
        //find email profile 
        const queryResult=await User.findOne({email:email});
        console.log("queryResult: "+JSON.stringify(queryResult,null,2));
        res.status(200).JSON({
            success:true,
            data:queryResult,
        })
    }
    catch(err)
    {
        res.status(500).JSON({
            success:false,
            data:err
        })
    }




}


