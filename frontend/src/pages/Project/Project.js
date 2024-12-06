import DataTable from "../../components/Datagrid/DataTable";
import { Link } from "react-router-dom";
import DashboardBox from "../Dashboard/DasboardBox";
import { AiFillProject, AiOutlineCalculator } from "react-icons/ai";
import { FaMoneyBill, FaThList } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { userdata } from "../Home/Signpage";


function countDistinctValues(objectsArray, key) {
  const valueSet = new Set();

  objectsArray.forEach(obj => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach(value => valueSet.add(value));
    }
  });

  return valueSet.size; // Return the count of distinct values
}


const Project = () => {
  const [projectRows, setProjectRows] = useState([]); 
  const [projectDash, setProjectDash] = useState([]);
  const [loading, setLoading] = useState(true); // For managing loading state
  const projectColumns =[
        { field: "name", headerName: "Project Name", flex: 1.5,
        renderCell: (params) => (
            <Link to='projectprofile' state={ {name: params.row.name, id: params.row.id} } style={{ textDecoration: 'none', color: '#007BFF' }}>
              {params.row.name}
            </Link>
          ),
        },
        { field: "description", headerName: "Description", flex: 3.2 },
        { field: "topic", headerName: "Topic", flex: 1.2 },
        { field: "status", headerName: "Status", flex: 1 },
        { field: "teamLead", headerName: "Team Lead", flex: 1 },
      ];
      /** Fetch API of Database SELECT * from Project; if for Myproject: Select * from Project where userid='value' **/
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("http://localhost:5001/api/fetch", {
              collectionName: "project", // Name of the collection
              condition: {}, // Replace with your condition, e.g., {status: "active"}
              projection: { 
                name: 1, 
                ownerid: 1, 
                description: 1, 
                technologies: 1, 
                ownerName: 1, 
                status: 1 
              }, // Fields to fetch
            });
    
            if (response.data.success) {
              const projects = response.data.data;
              console.log(projects)
    
              // Format data for rows
              const formattedData = projects.map((project) => ({
                id: project._id,
                name: project.name,
                description: project.description,
                status: project.status || "No funding info", // Default if funding is undefined
                teamLead: project.ownerName || "Not specified", // Default if founder is undefined
                topic: project.technologies.join(", ") || "No industry info", // Default if industry is undefined
              }));
              // Update projectRows state
              setProjectRows(formattedData);
              // Update projectDash state
              setProjectDash([
                {
                  text: "Registered Projects",
                  val: formattedData.length,
                  color: ["#1da256", "#48d483"],
                  icon: <AiOutlineCalculator />,
                },
                {
                  text: "Categories",
                  val: countDistinctValues(projects, "technologies"),
                  color: ["#c012e2", "#eb64fe"],
                  icon: <FaThList />,
                },
                {
                  text: "Total Revenue",
                  val: "Rs. 100cr", // Static value for now
                  color: ["#2c78ef", "#60aff5"],
                  icon: <FaMoneyBill />,
                },
              ]);
              setLoading(false)
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, []);

      if (loading){
        return(
          <div style={{ width: '100%' }}>
          <Skeleton animation="wave" width='100%' height='150px'/>
          <div style={{width: '100%', display: 'flex', position: 'relative', top: '-50px'}}>
            <Skeleton  width='100%' style={{marginRight: '16px', height: '300px', padding: '0px'}}/>
            <Skeleton animation="wave" width='100%' style={{marginRight: '16px', height: '300px', padding: '0px'}}/>
            <Skeleton animation={false} width='100%' style={{ height: '300px', padding: '0px'}}/>
          </div>
          <Skeleton animation="wave" width='100%' height='500px' style={{margin: '0px', padding: '0px', position: 'relative', top: '-150px'}}/>
        </div>
        );
      }
    return (
    <div className="projectpage">
      
        <div className="projectTop">
            <div className="projectDash">
                <span>Projects</span> <AiFillProject/>
            </div>
            <div className="projectStats w-100">
            {projectDash.map((row, index) => {
                return(
                    <DashboardBox key={index} valUser={row} color={row.color}/>
                ); })}
            </div>
        </div>
        
        <DataTable columns={projectColumns} initialrows={projectRows}/>
    </div>
    );
}
export default Project;