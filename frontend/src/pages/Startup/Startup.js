import DataTable from "../../components/Datagrid/DataTable";

import { Link } from "react-router-dom";

import DashboardBox from "../Dashboard/DasboardBox";

import { AiOutlineCalculator } from "react-icons/ai";

import { FaLightbulb, FaMoneyBill, FaThList } from 'react-icons/fa';

import axios from 'axios';

import { useState,useEffect } from "react";





function countDistinctValues(arr, key) {

    const distinctValues = new Set(arr.map(item => item[key]));

    return distinctValues.size;

}



const Startup = () => {



  const [projectRows,setProjectRows]=useState([]);





    const projectColumns =[

        { field: "name", headerName: "Brand", flex: 1.5,

        renderCell: (params) => (

            <Link to='startupprofile' state={ {name: params.row.name, id: params.row.id} } style={{ textDecoration: 'none', color: '#007BFF' }}>

              {params.row.name}

            </Link>

          ),

        },

        { field: "description", headerName: "Description", flex: 3.2 },

        { field: "startDate", headerName: "Revenue", flex: 0.8 },

        { field: "topic", headerName: "Field", flex: 1.2 },

        { field: "status", headerName: "Funding Status", flex: 1 },

        { field: "teamLead", headerName: "Founder", flex: 1 },

      ];

      /** Fetch API of Database SELECT * from Project; if for Myproject: Select * from Project where userid='value' **/

      /*const projectRows = [

        {

          id: 1,

          name: "WebTree",

          description: "An online HTML parser that generates a tree structure from HTML files and detects errors.",

          startDate: "2024-08-15",

          status: "Completed",

          teamLead: "Alice Johnson",

          topic: "Web Development",

        }

       

      ];*/

    

      

    const projectDash = [{text: 'Registered Startups', val: projectRows.length, color: ['#1da256', '#48d483'], icon:<AiOutlineCalculator/>}, {text: 'Categories', val: countDistinctValues(projectRows, 'topic'), color: ['#c012e2', '#eb64fe'], icon: <FaThList/>}, {text: 'Total revenue', val: 'Rs. 100cr', color: ['#2c78ef', '#60aff5'], icon: <FaMoneyBill/>},];

    

    useEffect(()=>{

    

      axios.get('http://localhost:8081/home/startUp/detail')

            .then(res=>{

              

              const startups = res.data.data;

              console.log(startups);

                // Map data to the format required for projectRows

                const formattedData = startups.map(startup => ({

                  id: startup._id,

                  name: startup.name,

                  description: startup.description,

                  startDate: startup.established, // Use established date or default

                  status: startup.funding, // Funding status or default

                  teamLead: startup.founder || "Not complete", // Founder name or default

                  topic: startup.industry.join(', ')

                }));



                // Update projectRows state

                setProjectRows(formattedData);



            })

            .catch(err=>console.log(err));

    },[])


    return (

    <div classprojectName="projectpage">

        <div className="projectTop">

            <div className="projectDash">

                <span>Startups</span> <FaLightbulb/>

            </div>

            <div className="projectStats w-100">

            {projectDash.map((row, index) => {

                return(

                    <DashboardBox valUser={row} color={row.color}/>

                ); })}

            </div>

        </div>

        <DataTable columns={projectColumns} initialrows={projectRows}/>

    </div>

    );

}

export default Startup