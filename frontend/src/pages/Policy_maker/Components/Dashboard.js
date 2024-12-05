import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({userEmail}) => {
    console.log("User Email: "+userEmail);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Data from Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetching data from APIs
                const [eventsRes, projectsRes, startupsRes] = await Promise.all([
                    axios.get("/api/upcoming-events"),
                    axios.get("/api/ongoing-projects"),
                    axios.get('http://localhost:8081/home/startUp/detail'),
                ]);

                // Setting state with fetched data
                setUpcomingEvents(eventsRes.data);
                setOngoingProjects(projectsRes.data);
                setStartups(startupsRes.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data from the server.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {/* Upcoming Events */}
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-600">Upcoming Events</h3>
                    <div className="mt-4 h-48 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-2">
                            {upcomingEvents.map((event, index) => (
                                <li key={index} className="text-gray-700">
                                    {event.event} - {event.date}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Ongoing Projects */}
                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-green-600">Ongoing Projects</h3>
                    <div className="mt-4 h-48 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-2">
                            {ongoingProjects.map((project, index) => (
                                <li key={index} className="text-gray-700">
                                    {project.project} - {project.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Startups */}
                <div className="bg-purple-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-purple-600">Startups</h3>
                    <div className="mt-4 h-48 overflow-y-auto custom-scrollbar">
                        <ul className="space-y-2">
                            {startups.map((startup, index) => (
                                <li key={index} className="text-gray-700">
                                    {startup.name} - {startup.stage}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-600">Total Projects</h3>
                    <p className="text-gray-700">Active: 30, Completed: 10</p>
                </div>

                <div className="bg-green-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-green-600">Total Funding</h3>
                    <p className="text-gray-700">₹10M allocated</p>
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-yellow-600">Applicant Activity</h3>
                    <p className="text-gray-700">Applicants Involved: 150</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
