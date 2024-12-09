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


const Startup = () => {
  const [projectRows, setProjectRows] = useState([]); 
  const [projectDash, setProjectDash] = useState([]);
  const [loading, setLoading] = useState(true); // For managing loading state
  const projectColumns =[
        { field: "name", headerName: "Project Name", flex: 1.5,
        renderCell: (params) => (
            <Link to='startupprofile' state={ {name: params.row.name, id: params.row.id} } style={{ textDecoration: 'none', color: '#007BFF' }}>
              {params.row.name}
            </Link>
          ),
        },
        { field: "description", headerName: "Description", flex: 3.2 },
        { field: "topic", headerName: "Topic", flex: 1.2 },
        { field: "Funding", headerName: "Funding", flex: 1 },
        { field: "teamLead", headerName: "Team Lead", flex: 1 },
      ];
      /** Fetch API of Database SELECT * from Project; if for Myproject: Select * from Project where userid='value' **/
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("http://localhost:5001/api/fetch", {
              collectionName: "startup", // Name of the collection
              condition: {isVerification: true}, // Replace with your condition, e.g., {Funding: "active"}
              projection: { 
                _id: 1,
                name: 1, 
                founder: 1, 
                description: 1, 
                established: 1 ,
                funding : 1,
                industry: 1
              }, // Fields to fetch
            });
    
            if (response.data.success) {
              const startups = response.data.data;
              console.log(startups)
    
              // Format data for rows
              const formattedData = startups.map(startup => ({
                id: startup._id,
                name: startup.name,
                description: startup.description,
                startDate: startup.established, // Use established date or default
                Funding: startup.funding, // Funding Funding or default
                teamLead: startup.founder || "Not complete", // Founder name or default
                topic: startup.industry.join(', ')
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
                  val: countDistinctValues(startups, "industry"),
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
                <span>Startups</span> <AiFillProject/>
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
export default Startup;