import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="min-h-screen bg-white-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-black-600 mb-6 text-center">
          Team Information
        </h1>

        {/* Leadership Team Section */}
        <form className="mb-8">
          <h2 className="text-xl font-bold text-black-500 mb-4">
            Leadership Team
          </h2>

          {/* Name Input */}
          <label className="block mb-4">
            <span className="text-black-700">Name</span>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Enter team member name"
            />
          </label>

          {/* LinkedIn Input */}
          <label className="block mb-4">
            <span className="text-black-700">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="Enter LinkedIn Profile URL"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Enter LinkedIn profile URL"
            />
          </label>

          {/* Role Dropdown */}
          <label className="block mb-4">
            <span className="text-black-700">Role</span>
            <select
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Select role"
            >
              <option value="Founder">Founder</option>
              <option value="Co-founder">Co-founder</option>
              <option value="Executive Leadership">
                Executive Leadership
              </option>
            </select>
          </label>

          {/* Designation Input */}
          <label className="block mb-4">
            <span className="text-black-700">Designation</span>
            <input
              type="text"
              placeholder="Enter Designation"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Enter designation"
            />
          </label>

          {/* Save Button */}
          <button
            type="button"
            className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Add another team member by clicking Save.
          </p>
        </form>

        {/* Advisory Board Section */}
        <form className="mb-8">
          <h2 className="text-xl font-bold text-black-500 mb-4">
            Advisory Board
          </h2>

          {/* Name Input */}
          <label className="block mb-4">
            <span className="text-black-700">Name</span>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Enter advisory board member name"
            />
          </label>

          {/* LinkedIn Input */}
          <label className="block mb-4">
            <span className="text-black-700">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="Enter LinkedIn Profile URL"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Enter LinkedIn profile URL"
            />
          </label>

          {/* Save Button */}
          <button
            type="button"
            className="bg-black-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Add another advisory board member by clicking Save.
          </p>
        </form>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Link to="/Basic_Info">
            <button
              type="button"
              className="bg-white-300 text-black-700 px-4 py-2 rounded-md transition duration-300"
              aria-label="Navigate to previous section"
            >
              Previous
            </button>
          </Link>

          <Link to="/Financials">
            <button
              type="button"
              className=" text-white px-4 py-2 rounded-md bg-blue-600 transition duration-300"
              aria-label="Navigate to next section"
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Team; 
