import DataTable from "../../components/Datagrid/DataTable";
import { Link } from "react-router-dom";
import DashboardBox from "../Dashboard/DasboardBox";
import { AiFillProject, AiOutlineCalculator } from "react-icons/ai";
import { FaMoneyBill, FaThList, FaPlus } from 'react-icons/fa';
import { Button } from "@mui/material";


function countDistinctValues(arr, key) {
    const distinctValues = new Set(arr.map(item => item[key]));
    return distinctValues.size;
}

const MyProject = ({type='public',userEmail}) => {
    const projectColumns =[
        { field: "name", headerName: "Project Name", flex: 1.5,
        renderCell: (params) => (
            <Link to='projectprofile' state={ {name: params.row.name, id: params.row.id} } style={{ textDecoration: 'none', color: '#007BFF' }}>
              {params.row.name}
            </Link>
          ),
        },
        { field: "description", headerName: "Description", flex: 3.2 },
        { field: "startDate", headerName: "Start Date", flex: 0.8 },
        { field: "topic", headerName: "Topic", flex: 1.2 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "teamLead", headerName: "Team Lead", flex: 1 },
      ];
      /** Fetch API of Database SELECT * from Project; if for MyProject: Select * from Project where userid='value' **/
      const projectRows = [
        {
          id: 1,
          name: "WebTree",
          description: "An online HTML parser that generates a tree structure from HTML files and detects errors.",
          startDate: "2024-08-15",
          status: "Completed",
          teamLead: "Alice Johnson",
          topic: "Web Development",
        },
        {
          id: 2,
          name: "CallBreak Game",
          description: "A desktop card game application developed in Qt C++ with multiplayer support.",
          startDate: "2024-07-01",
          status: "Completed",
          teamLead: "Bob Brown",
          topic: "Game Development",
        },
        {
          id: 3,
          name: "Database Query Converter",
          description: "A tool for seamless translation between SQL, MongoDB, and XQuery queries using regex.",
          startDate: "2024-09-10",
          status: "In Progress",
          teamLead: "Charlie Davis",
          topic: "Data Management",
        },
        {
          id: 4,
          name: "College Portal",
          description: "A MERN stack web application for college management, featuring student registration and course management.",
          startDate: "2024-06-01",
          status: "Completed",
          teamLead: "David Smith",
          topic: "Web Development",
        },
        {
          id: 5,
          name: "Smart Library System",
          description: "An AI-powered library management tool with book recommendations and real-time inventory updates.",
          startDate: "2024-10-01",
          status: "Planned",
          teamLead: "Eve Green",
          topic: "AI & Machine Learning",
        },
        {
          id: 6,
          name: "Fitness Tracker",
          description: "A mobile app for tracking fitness metrics, workout plans, and calorie intake.",
          startDate: "2024-11-05",
          status: "In Progress",
          teamLead: "Frank Lee",
          topic: "Mobile App Development",
        },
        {
          id: 7,
          name: "E-commerce Analytics",
          description: "A dashboard for analyzing sales trends, customer behavior, and inventory optimization.",
          startDate: "2024-08-01",
          status: "Completed",
          teamLead: "Grace Hall",
          topic: "Data Analytics",
        },
        {
          id: 8,
          name: "Online Quiz Platform",
          description: "An interactive platform for creating and hosting quizzes with real-time scoring.",
          startDate: "2024-07-15",
          status: "Completed",
          teamLead: "Hank Wilson",
          topic: "Web Development",
        },
        {
          id: 9,
          name: "Travel Planner App",
          description: "An app for planning trips with itinerary suggestions, budget tracking, and peer reviews.",
          startDate: "2024-09-01",
          status: "In Progress",
          teamLead: "Ivy Carter",
          topic: "Mobile App Development",
        },
        {
          id: 10,
          name: "Weather Forecast API",
          description: "A REST API providing real-time weather updates and forecasts with location-based data.",
          startDate: "2024-10-10",
          status: "Planned",
          teamLead: "Jack Morgan",
          topic: "API Development",
        },
        {
          id: 11,
          name: "AI Chatbot",
          description: "A conversational AI chatbot for customer service and support across multiple platforms.",
          startDate: "2024-08-20",
          status: "In Progress",
          teamLead: "Kara Davis",
          topic: "AI & Machine Learning",
        },
        {
          id: 12,
          name: "Voice Recognition System",
          description: "A voice-enabled assistant with natural language processing capabilities for device control.",
          startDate: "2024-09-05",
          status: "Planned",
          teamLead: "Leo Morgan",
          topic: "AI & Machine Learning",
        },
        {
          id: 13,
          name: "Online Food Ordering System",
          description: "A full-stack web application for ordering food online, featuring payment integration and real-time tracking.",
          startDate: "2024-07-01",
          status: "Completed",
          teamLead: "Maya Patel",
          topic: "Web Development",
        },
        {
          id: 14,
          name: "Social Media Dashboard",
          description: "A dashboard application for managing social media content, analyzing engagement, and scheduling posts.",
          startDate: "2024-06-20",
          status: "In Progress",
          teamLead: "Nathan Clark",
          topic: "Web Development",
        },
        {
          id: 15,
          name: "Cryptocurrency Tracker",
          description: "An application to track cryptocurrency prices, portfolio management, and market trends.",
          startDate: "2024-09-15",
          status: "Planned",
          teamLead: "Olivia Harris",
          topic: "Finance & Tech",
        },
        {
          id: 16,
          name: "Automated Task Scheduler",
          description: "A system for automating tasks, setting reminders, and scheduling jobs for businesses and individuals.",
          startDate: "2024-10-12",
          status: "In Progress",
          teamLead: "Paul Walker",
          topic: "Automation & Scheduling",
        },
        {
          id: 17,
          name: "Smart Home Automation",
          description: "A system that integrates smart devices into a single platform for remote control and automation.",
          startDate: "2024-11-01",
          status: "Planned",
          teamLead: "Quinn Scott",
          topic: "IoT & Smart Devices",
        },
        {
          id: 18,
          name: "Job Portal Platform",
          description: "A platform for job seekers and recruiters with profile creation, job matching, and interview scheduling.",
          startDate: "2024-06-30",
          status: "Completed",
          teamLead: "Rachel Lee",
          topic: "Web Development",
        },
        {
          id: 19,
          name: "Online Ticket Booking",
          description: "A platform for booking movie, event, and travel tickets online with real-time availability and payment integration.",
          startDate: "2024-08-10",
          status: "In Progress",
          teamLead: "Samuel White",
          topic: "Web Development",
        },
        {
          id: 20,
          name: "Library Management System",
          description: "A comprehensive library management system with book search, cataloging, and member management.",
          startDate: "2024-07-25",
          status: "Completed",
          teamLead: "Tina Lewis",
          topic: "Software Development",
        },
        {
          id: 21,
          name: "Task Manager",
          description: "A task management application with collaboration tools for teams to manage projects and deadlines.",
          startDate: "2024-06-10",
          status: "In Progress",
          teamLead: "Uma Jones",
          topic: "Mobile App Development",
        },
        {
          id: 22,
          name: "Inventory Management System",
          description: "A system for tracking inventory levels, managing stock orders, and optimizing supply chains.",
          startDate: "2024-07-05",
          status: "Completed",
          teamLead: "Victor Brown",
          topic: "Software Development",
        },
        {
          id: 23,
          name: "Real-Time Collaboration App",
          description: "A platform that allows teams to collaborate in real-time, share documents, and communicate effectively.",
          startDate: "2024-09-22",
          status: "Planned",
          teamLead: "Wendy Black",
          topic: "Collaboration Tools",
        },
        {
          id: 24,
          name: "Budget Tracker",
          description: "A personal finance management app that tracks expenses, income, and savings goals.",
          startDate: "2024-08-15",
          status: "In Progress",
          teamLead: "Xander King",
          topic: "Finance & Tech",
        },
        {
          id: 25,
          name: "Cloud Storage Service",
          description: "A cloud-based storage service offering secure file sharing, backup, and synchronization across devices.",
          startDate: "2024-10-05",
          status: "Completed",
          teamLead: "Yara Martin",
          topic: "Cloud Computing",
        },
        {
          id: 26,
          name: "Document Scanner App",
          description: "A mobile app that uses OCR technology to scan and digitize documents into editable formats.",
          startDate: "2024-09-18",
          status: "Planned",
          teamLead: "Zane Harris",
          topic: "Mobile App Development",
        },
        {
          id: 27,
          name: "Online Learning Platform",
          description: "A platform for delivering educational content, supporting video lectures, quizzes, and discussion forums.",
          startDate: "2024-06-18",
          status: "In Progress",
          teamLead: "Ava Mitchell",
          topic: "EdTech",
        },
        {
          id: 28,
          name: "Real Estate Listing App",
          description: "An app for browsing, listing, and managing real estate properties with location-based search.",
          startDate: "2024-08-25",
          status: "Completed",
          teamLead: "Ben Parker",
          topic: "Mobile App Development",
        },
        {
          id: 29,
          name: "News Aggregator",
          description: "An app that collects and displays news articles from various sources based on user interests.",
          startDate: "2024-09-12",
          status: "Planned",
          teamLead: "Clara Evans",
          topic: "Media & Content",
        },
        {
          id: 30,
          name: "Fitness Challenge App",
          description: "An app that allows users to join fitness challenges, track their progress, and compete with others.",
          startDate: "2024-10-15",
          status: "In Progress",
          teamLead: "Diana White",
          topic: "Mobile App Development",
        },
      ];
      const projectDash = [{text: 'Total Projects', val: projectRows.length, color: ['#1da256', '#48d483'], icon:<AiOutlineCalculator/>}, {text: 'Categories', val: countDistinctValues(projectRows, 'topic'), color: ['#c012e2', '#eb64fe'], icon: <FaThList/>}, {text: 'Capital Owns', val: 'Rs1cr', color: ['#2c78ef', '#60aff5'], icon: <FaMoneyBill/>},];
      
    return (
    <div classprojectName="projectpage">
        <div className="projectTop">
            <div className="projectDash">
                <span>My Projects</span> <AiFillProject/>
            </div>
            <div className="projectStats w-100">
            {projectDash.map((row, index) => {
                return(
                    <DashboardBox key={index} valUser={row} color={row.color}/>
                ); })}
            </div>
        </div>
        <div className="flex mt-8" style={{padding: '0px 0px 0px 16px'}}>
          <Link to='new'>
            <Button variant="contained" color="primary" className="px-6 py-3">
                Create New <FaPlus/>
            </Button>
            </Link>
        </div>
        <DataTable columns={projectColumns} initialrows={projectRows}/>
    </div>
    );
}
export default MyProject;