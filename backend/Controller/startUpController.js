import { query } from "express";
import Startup from "../model/startup.js"
import mongoose from "mongoose";

export const dashboardDetail = async (req, res) => 
{
  try 
  {
    // Fetch all documents from the startup collection
    const startups = await Startup.find(); 
    console.log("data: "+startups)
    // Send data as response
    res.status(200).json({
      success: true,
      data: startups,
    });
  } 
  catch (err) 
  {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const userProfileDetail= async(req,res)=>
{
  try 
  {
    // Fetch all documents from the startup collection
    const id=req.query.id;
    console.log("id: "+id);
    const ObjectId = mongoose.Types.ObjectId;
    console.log("object id: "+ObjectId);
    let startup = await Startup.find({_id:new ObjectId(id)}); 

    if (startup.graph && startup.graph.data) {
      startup.graph.data = startup.graph.data.map((item) => parseInt(item.$numberInt || item));
  }

    console.log("data: "+startup)
    // Send data as response
    res.status(200).json({
      success: true,
      data: startup,
    });
  } 
  catch (err) 
  {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}



