import React from "react";
import recentFundingActivities from './data/funding.json'

const Funding = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Funding Overview</h2>
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Total Funded Amount */}
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-blue-600">Total Funded Amount</h3>
          <p className="text-gray-700">$10M Distributed</p>
        </div>

        {/* Funding Allocation */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-green-600">Funding Allocation</h3>
          {/* Placeholder for pie chart or table */}
          <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-700">
            Pie chart placeholder
          </div>
        </div>
      </div>

      {/* Recent Funding Activity */}
      <h3 className="text-xl font-bold text-gray-800 mt-6">
        Recent Funding Activity
      </h3>
      <div className="mt-4 h-40 overflow-y-auto custom-scrollbar">
        <ul className="space-y-4">
          {recentFundingActivities.map((activity) => (
            <li key={activity.id} className="text-gray-700">
              Funding of {activity.amount} for {activity.project} -{" "}
              {activity.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Funding;
