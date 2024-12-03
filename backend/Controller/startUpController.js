import { query } from "express";
import startup from "../modal/startup.js"


export const dashboardDetail=async(req,res)=>
{
    const queryResult=await startup.find();
    res.send(queryResult);
}