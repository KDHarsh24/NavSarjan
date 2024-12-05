//import { query } from "express";
import Project from '../model/project.js'
import mongoose from "mongoose";

export const projectDetail = async (req, res) => 
{
  try 
  {
    // Fetch all documents from the project collection
    const project = await Project.find(); 
    console.log("data: "+project)
    // Send data as response
    res.status(200).json({
      success: true,
      data: project,
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

export const myprojectDetail = async (req, res) => {
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
    const projects = await Project.find({ email: email });

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found for the provided email.",
      });
    }

    console.log("Fetched projects: ", projects);

    // Send data as response
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error("Error fetching startup details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const projectProfileDetail = async (req, res) => {
  try {
    const id = req.query.id;
    console.log("id: " + id);
    const ObjectId = mongoose.Types.ObjectId;
    let project = await Project.findOne({ _id: new ObjectId(id) });

    if (project.graph && project.graph.data) {
      project.graph.data = project.graph.data.map((item) => ({
        label: item.label,
        revenue: parseInt(item.revenue.$numberInt || item.revenue),
        profit: parseInt(item.profit.$numberInt || item.profit),
        netProfit: parseInt(item.netProfit.$numberInt || item.netProfit),
        document: item.document,
      }));
    }

    console.log("data: " + project);
    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (err) {
    console.error("Error fetching project details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const newprojectDetail=async(req,res)=>
{
  try
  {
    const project=req.body;
   
    let queryResult=new project(project);
    queryResult=await queryResult.save();

    // Send data as response
    res.status(200).json({
      success: true,
      data: queryResult,
    });
  }
  catch(err)
  {
    console.error("Error fetching project details:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}