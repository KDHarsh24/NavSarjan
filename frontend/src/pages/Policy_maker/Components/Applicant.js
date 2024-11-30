import React, { useState, useEffect } from 'react';
import applicantsData from './data/applicants.json'; // Assuming the file is located in the 'data' folder

const Applicant = () => {
  const [applicants, setApplicants] = useState([]);
  const [milestones, setMilestones] = useState({ completed: 0, inProgress: 0 });

  // Fetch the applicants data and count milestones
  useEffect(() => {
    setApplicants(applicantsData);

    const completedCount = applicantsData.filter(applicant => applicant.status === 'Completed').length;
    const inProgressCount = applicantsData.filter(applicant => applicant.status === 'In Progress').length;

    setMilestones({ completed: completedCount, inProgress: inProgressCount });
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Applicant Tracking</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Applicant List</h3>
          <div className="mt-4 h-24 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              {applicants.map((applicant) => (
                <li key={applicant.id} className="text-gray-700">
                  {applicant.name} - {applicant.project} - {applicant.status}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Applicant Status</h3>
          <p className="text-gray-700">Milestones: {milestones.completed}/{milestones.completed + milestones.inProgress} Completed</p>
        </div>
      </div>

      {/* Communication Tools */}
      <button className="bg-blue-500 text-white p-3 mt-6 rounded-lg">Contact Applicants</button>
    </div>
  );
}

export default Applicant;
