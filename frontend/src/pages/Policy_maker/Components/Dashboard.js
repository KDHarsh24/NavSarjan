import React from 'react'
import upcomingEvents from "./data/upcomingEvents.json";
import ongoingProjects from "./data/ongoingProjects.json";

const Dashboard = ()=>{
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
}

export default Dashboard;