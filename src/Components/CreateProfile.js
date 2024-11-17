import React from "react";
import {Link} from "react-router-dom";
import Basic_Info from "./Applicant/Basic_Info";

function CreateProfile() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
          Create Profile
        </h2>

        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-orange-700 font-medium mb-1"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter company name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="yourName"
            className="block text-orange-700 font-medium mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="yourName"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="mailId"
            className="block text-orange-700 font-medium mb-1"
          >
            Mail ID
          </label>
          <input
            type="email"
            id="mailId"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-orange-700 font-medium mb-1"
          >
            Phone Number
          </label>   
          <input
            type="number"
            id="phoneNumber"
            placeholder="Enter your phone number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <Link to="/Basic_Info">
        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300">
          Submit
        </button>
        </Link>
      </form>
    </div>
  );
}

export default CreateProfile;
