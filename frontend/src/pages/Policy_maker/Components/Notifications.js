import React from 'react';
import notifications from './data/notifications.json'; // Assuming this is the correct path

const Notifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">Notifications and Alerts</h2>
      <div className="mt-6 h-24 overflow-y-auto custom-scrollbar">
        <ul className="space-y-4">
          {notifications.map((notification, index) => (
            <li key={index} className="text-gray-700">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
