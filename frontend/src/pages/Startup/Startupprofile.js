import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StartupProfile = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const [startupData, setStartupData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/company/${companyId}`);
        setStartupData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  if (loading) return <div>Loading...</div>;

  if (!startupData) return <div>No data found!</div>;

  const { company, socialLinks, documents, team, advisoryBoard, industry } = startupData;

  return (
    <div>
      <h1>{company.company_name}</h1>
      <p>{company.about_company}</p>
      <img src={company.company_logo} alt="Company Logo" style={{ width: "100px" }} />
      <p><b>Elevator Pitch:</b> {company.elevator_pitch}</p>
      <p><b>Business Model:</b> {company.business_model}</p>

      <h2>Social Links</h2>
      <ul>
        {socialLinks.map((link, index) => (
          <li key={index}>
            {link.platform}: <a href={link.url}>{link.url}</a>
          </li>
        ))}
      </ul>

      <h2>Documents</h2>
      <ul>
        <li>GST Certificate: {documents.gst_certificate}</li>
        <li>Aadhar Card: {documents.aadhar_card}</li>
        <li>PAN Card: {documents.pan_card}</li>
      </ul>

      <h2>Team</h2>
      <ul>
        {team.map((member, index) => (
          <li key={index}>
            {member.member_name} - {member.designation} 
            {member.is_leadership ? " (Leadership)" : ""}
          </li>
        ))}
      </ul>

      <h2>Advisory Board</h2>
      <ul>
        {advisoryBoard.map((advisor, index) => (
          <li key={index}>{advisor.member_name}</li>
        ))}
      </ul>

      <h2>Industry</h2>
      <p>Industry Domain: {industry.industry_domain}</p>
      <p>Technology Domain: {industry.technology_domain}</p>
    </div>
  );
};

export default StartupProfile;
