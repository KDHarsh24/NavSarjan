import DataTable from "../../components/Datagrid/DataTable";
import { Link } from "react-router-dom";
import DashboardBox from "../Dashboard/DasboardBox";
import { AiOutlineCalculator } from "react-icons/ai";
import { FaLightbulb, FaMoneyBill, FaThList } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from "react";

function countDistinctValues(arr, key) {
    const distinctValues = new Set(arr.map(item => item[key]));
    return distinctValues.size;
}

const Startup = () => {
    const [projectRows, setProjectRows] = useState([]); // State to store project data

    const projectColumns = [
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

    const projectDash = [
        {text: 'Registered Startups', val: projectRows.length, color: ['#1da256', '#48d483'], icon: <AiOutlineCalculator />},
        {text: 'Categories', val: countDistinctValues(projectRows, 'topic'), color: ['#c012e2', '#eb64fe'], icon: <FaThList />},
        {text: 'Total revenue', val: 'Rs. 100cr', color: ['#2c78ef', '#60aff5'], icon: <FaMoneyBill />},
    ];

    useEffect(() => {
        console.log("Fetching data from the backend");
        axios.get('http://localhost:8081/home/startUp/detail')
            .then(res => {
                console.log("API Response:", res);  // Log the full response

                // Check if res.data.data is an array before attempting to map
                if (Array.isArray(res.data.data)) {
                    // Map the response data to match the projectRows structure
                    const fetchedData = res.data.data.map(item => ({
                        id: item._id,
                        name: item.name,
                        description: item.description,
                        startDate: item.established,  // Assuming 'established' is the start date
                        status: item.funding,        // Assuming 'funding' is the status
                        teamLead: item.founder,
                        topic: item.industry.join(', '), // Assuming 'industry' is the field
                    }));

                    setProjectRows(fetchedData);  // Update the projectRows with the fetched data
                } else {
                    console.error("Expected an array in res.data.data, but received:", res.data.data);
                }
            })
            .catch(err => {
                console.error('Error fetching data:', err);
            });
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    console.log("Project Rows:", projectRows);  // Log the projectRows to see if data is being set correctly

    return (
        <div className="projectpage">
            <div className="projectTop">
                <div className="projectDash">
                    <span>Startups</span> <FaLightbulb />
                </div>
                <div className="projectStats w-100">
                    {projectDash.map((row, index) => (
                        <DashboardBox key={index} valUser={row} color={row.color} />
                    ))}
                </div>
            </div>
            {/* Ensure DataTable is properly receiving the data */}
            <DataTable columns={projectColumns} initialrows={projectRows} />
        </div>
    );
};

export default Startup;