import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import './all.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginDetails, setLoginDetails] = useState("You are logged in as Policy Maker..");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logged out");
  };

  return (
    <div className="flex text-center items-center">
      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="p-3 text-white bg-blue-500 focus:outline-none"
      >
        <FaBars size={20} />
      </button>

      {/* Animated Paragraph */}
      <div className="overflow-hidden w-full">
        <p
          className="text-xl font-bold px-10 flex text-center animate-slide"
          style={{ whiteSpace: "nowrap" }}
        >
          {loginDetails}
        </p>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-200 shadow-md transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64`}
      >
        <div className="p-5">
          <h2 className="text-lg font-bold text-center mb-6">Policy Maker</h2>
          <ul className="space-y-4">
            <li className="text-black font-semibold cursor-pointer">Home</li>
            <li className="text-black font-semibold cursor-pointer">My Project</li>
            <li className="text-black font-semibold cursor-pointer">Discover</li>
            <li className="text-black font-semibold cursor-pointer">My Actions</li>
            <li className="text-black font-semibold cursor-pointer">Events</li>
            <li className="text-black font-semibold cursor-pointer">Account Setting</li>
          </ul>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-5">
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay (optional, for click-to-close effect) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
