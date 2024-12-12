import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Reports from './Reports';
import Feedback from './Feedback';
import axios from 'axios';
import './all.css';
import { format } from 'date-fns';
import Timeline from '../../../components/Timeline';

const PolicyMakerLandingPage = () => {
  ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const calculateTotalFundedAmount = (projects) => {
    if (!projects || projects.length === 0) return 0;
    return projects.reduce((total, project) => {
      const projectFunding = project.investors?.reduce(
        (sum, investor) => sum + (investor.amount || 0),
        0
      );
      return total + (projectFunding || 0);
    }, 0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }

    return format(date, 'MMM dd, yyyy');  // Example: Dec 15, 2024
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const projectResponse = await axios.post('http://localhost:5001/api/fetch', {
        collectionName: 'project',
        condition: {},
        projection: {}
      });

      const eventsResponse = await axios.post('http://localhost:5001/api/fetch', {
        collectionName: 'events',
        condition: {},
        projection: {}
      });

      if (projectResponse.data.success && eventsResponse.data.success) {
        const fetchedProjects = projectResponse.data.data;
        const fetchedEvents = eventsResponse.data.data;
        setData({ ...data, upcomingEvents: fetchedEvents });
        setAllProjects(fetchedProjects);
      } else {
        setError('Error fetching data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalActiveProjects = allProjects.filter((p) => p.status === 'In Progress').length;
  const totalCompletedProjects = allProjects.filter((p) => p.status === 'Completed').length;
  const totalFundedAmount = calculateTotalFundedAmount(allProjects);

  const renderPieChart = () => {
    if (!selectedProject || !selectedProject.investors || selectedProject.investors.length === 0) {
      return <p>No funding data available for this project.</p>;
    }

    const data = {
      labels: selectedProject.investors.map((investor) => investor.name),
      datasets: [
        {
          data: selectedProject.investors.map((investor) => investor.amount),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
    };

    return <Pie data={data} height={200} width={200} options={options} />;
  };

  return (
    <div className="flex min-h-screen">
  <div className="flex-1 bg-gray-100">
    <div className="p-8 space-y-8">
      {/* Dashboard Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">Upcoming Events</h3>
            <div className="mt-4 space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
              {data?.upcomingEvents?.length > 0 ? (
                data.upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-lg font-bold text-gray-800">{event.Title}</h4>
                    <p className="text-gray-600">Start: {formatDate(event.Start)}</p>
                    <p className="text-gray-700">{event.description}</p>
                    {event.link && (
                      <a href={event.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Event Link
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p>No upcoming events.</p>
              )}
            </div>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-green-600">All Projects</h3>
            <div className="mt-4 space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
              {allProjects.map((project, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold text-gray-800">{project.name}</h4>
                  <p className="text-gray-700">{project.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md col-span-1">
            <h3 className="text-xl font-bold text-blue-600">Total Projects</h3>
            <p className="text-gray-700">Active: {totalActiveProjects}, Completed: {totalCompletedProjects}</p>
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-600">Total Funding</h3>
              <p className="text-gray-700">₹{totalFundedAmount.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Project Management */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Project Monitoring and Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Project List */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Project List</h3>
            <div className="mt-4 space-y-4 max-h-[200px] overflow-y-auto">
              {allProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:text-blue-500"
                  onClick={() => setSelectedProject(project)}
                >
                  <h4 className="text-lg font-bold text-gray-800">{project.name}</h4>
                  <p className="text-gray-700">{project.description}</p>
                  
                </div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Project Details</h3>
            <div className="mt-4 h-48 overflow-y-auto">
              {selectedProject ? (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{selectedProject.name}</h4>
                  <p className="text-gray-700">{selectedProject.description}</p>
                  <p className="text-gray-700">Status: {selectedProject.status}</p>
                  <p className="text-gray-700">
                    Technologies: {selectedProject.technologies?.join(', ') || 'N/A'}
                  </p>
                </div>
              ) : (
                <p className="text-gray-700">Click on a project to view more details.</p>
              )}
            </div>
          </div>
        </div>

        {/* Funding Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-bold text-gray-800">Funding Distribution</h3>
          <div className="mt-4">
            {renderPieChart()}
          </div>
        </div>
      </div>

      {/* Applicant List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Applicant Tracking</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Applicant List</h3>
          <div className="mt-4 h-24 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              {/* {applicants.map((applicant) => (
                <li key={applicant.id} className="text-gray-700">
                  {applicant.name} - {applicant.project} - {applicant.status}
                </li>
              ))} */}
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Applicant Status</h3>
          {/* <p className="text-gray-700">Milestones: {milestones.completed}/{milestones.completed + milestones.inProgress} Completed</p> */}
        </div>
      </div>

      {/* Communication Tools */}
      <button className="bg-blue-500 text-white p-3 mt-6 rounded-lg">Contact Applicants</button>
    </div>

      <Reports />
      <Feedback />
    </div>
  </div>
  
</div>

  );
};

export default PolicyMakerLandingPage;
