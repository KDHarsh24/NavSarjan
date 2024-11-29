import React from 'react';
import policies from './data/policies.json'; // Importing policies from a JSON file

const Policy = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Policy Management</h2>
      <button className="bg-blue-500 text-white p-3 mt-6 rounded-lg">Create New Policy</button>

      <div className="mt-6 h-24 overflow-y-auto custom-scrollbar">
        <ul className="space-y-4">
          {policies.map((policy, index) => (
            <li key={index} className="text-gray-700">
              {policy.name} - {policy.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Policy;
