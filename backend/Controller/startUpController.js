//import { query } from "express";
import Startup from "../model/startup.js"
import mongoose from "mongoose";

export const startupDetail = async (req, res) => 
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

export const mystartupDetail = async (req, res) => {
  console.log("in my startUp detail")
  try {
    const { email } = req.body; // Extract email from request body
    console.log("email in mystartup: "+email);
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required in the request body.",
      });
    }

    // Fetch all documents from the startup collection matching the provided email
    const startups = await Startup.find({ founderuserid: email });

    if (startups.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No startups found for the provided email.",
      });
    }

    console.log("Fetched startups: ", startups);

    // Send data as response
    res.status(200).json({
      success: true,
      data: startups,
    });
  } catch (err) {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const userProfileDetail = async (req, res) => {
  try {
    const id = req.query.id;
    console.log("id: " + id);
    const ObjectId = mongoose.Types.ObjectId;
    let startup = await Startup.findOne({ _id: new ObjectId(id) });

    if (startup.graph && startup.graph.data) {
      startup.graph.data = startup.graph.data.map((item) => ({
        label: item.label,
        revenue: parseInt(item.revenue.$numberInt || item.revenue),
        profit: parseInt(item.profit.$numberInt || item.profit),
        netProfit: parseInt(item.netProfit.$numberInt || item.netProfit),
        document: item.document,
      }));
    }

    console.log("data: " + startup);
    res.status(200).json({
      success: true,
      data: startup,
    });
  } catch (err) {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const newStartUpDetail=async(req,res)=>
{
  try
  {
    const startup=req.body;
   
    let queryResult=new Startup(startup);
    queryResult=await queryResult.save();

    // Send data as response
    res.status(200).json({
      success: true,
      data: queryResult,
    });
  }
  catch(err)
  {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}