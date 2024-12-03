import { query } from "express";
import Startup from "../model/startup.js"


export const dashboardDetail = async (req, res) => {
    try {
      // Fetch all documents from the startup collection
      const startups = await Startup.find(); 
  
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