import express from "express";
import {projectDetail, myprojectDetail, projectProfileDetail, newprojectDetail} from '../Controller/projectController.js'

const router = express.Router();

// Route to fetch startup details
router.get('/project/detail', projectDetail); 
router.post('/myproject/detail', myprojectDetail);
router.get('/profileDetail',projectProfileDetail);
router.post('/newproject',newprojectDetail);

export default router;