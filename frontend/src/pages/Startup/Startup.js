import React, { useEffect, useState } from "react";
import DataTable from "../../components/Datagrid/DataTable";
import { Link } from "react-router-dom";
import DashboardBox from "../Dashboard/DasboardBox";
import { AiOutlineCalculator } from "react-icons/ai";
import { FaLightbulb, FaMoneyBill, FaThList } from "react-icons/fa";

function countDistinctValues(arr, key) {
  const distinctValues = new Set(arr.map((item) => item[key]));
  return distinctValues.size;
}

const Startup = () => {
  const [projects, setProjects] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5001/api/projects")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);

        const total = data.reduce((sum, project) => sum + parseFloat(project.revenue || 0), 0);
        setTotalRevenue(total);
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const distinctTopics = countDistinctValues(projects, "topic");

  const projectColumns = [
    {
      field: "name",
      headerName: "Brand",
      flex: 1.5,
      renderCell: (params) => (
        <Link
          to="/startupprofile"
          state={{ name: params.row.name, id: params.row.id }}
          style={{ textDecoration: "none", color: "#007BFF" }}
        >
          {params.row.name}
        </Link>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3.2,
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordWrap: "break-word", lineHeight: 1.5 }}>
          {params.row.description}
        </div>
      ),
    },
    { field: "revenue", headerName: "Revenue", flex: 0.8 },
    { field: "topic", headerName: "Field", flex: 1.2 },
    { field: "status", headerName: "Funding Status", flex: 1 },
    { field: "teamLead", headerName: "Founder", flex: 1 },
  ];

  const projectDash = [
    { text: "Registered Startups", val: projects.length, color: ["#1da256", "#48d483"], icon: <AiOutlineCalculator /> },
    { text: "Distinct Topics", val: distinctTopics, color: ["#c012e2", "#eb64fe"], icon: <FaThList /> },
    { text: "Total revenue", val: `Rs. ${totalRevenue.toFixed(2)} cr`, color: ["#2c78ef", "#60aff5"], icon: <FaMoneyBill /> },
  ];

  return (
    <div className="projectpage">
      <div className="projectTop">
        <div className="projectDash">
          <span>Startups</span> <FaLightbulb />
        </div>
        <div className="projectStats w-100">
          {projectDash.map((row, index) => (
            <DashboardBox valUser={row} color={row.color} key={index} />
          ))}
        </div>
      </div>
      <DataTable rows={projects} columns={projectColumns} />
    </div>
  );
};

export default Startup;
