import React from "react";
import {Link} from "react-router-dom";

function Team() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Team Information
        </h1>

        {/* Leadership Team Form */}
        <form className="mb-8">
          <h2 className="text-xl font-bold text-orange-500 mb-4">
            Leadership Team
          </h2>

          <label className="block mb-4">
            <span className="text-orange-700">Name</span>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />   
          </label>

          <label className="block mb-4">
            <span className="text-orange-700">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="Enter LinkedIn Profile URL"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

          <label className="block mb-4">
            <span className="text-orange-700">Role</span>
            <select className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="Founder">Founder</option>
              <option value="Co-founder">Co-founder</option>
              <option value="Executive Leadership">
                Executive Leadership
              </option>
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-orange-700">Designation</span>
            <input
              type="text"
              placeholder="Enter Designation"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Save
          </button>
          <p className="mt-2 text-sm text-gray-600">
            On click, create "Add Team Member" form
          </p>
        </form>

        {/* Advisory Board Form */}
        <form className="mb-8">
          <h2 className="text-xl font-bold text-orange-500 mb-4">
            Advisory Board
          </h2>

          <label className="block mb-4">
            <span className="text-orange-700">Name</span>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

          <label className="block mb-4">
            <span className="text-orange-700">LinkedIn Profile</span>
            <input
              type="url"
              placeholder="Enter LinkedIn Profile URL"
              className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </label>

          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Save
          </button>
          <p className="mt-2 text-sm text-gray-600">
            On click, create "Add Team Member" form
          </p>
        </form>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Previous
          </button>
          <Link to="/Financials">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
            Next
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Team;
