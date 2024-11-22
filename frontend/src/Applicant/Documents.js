import React from "react";
import { Link } from "react-router-dom";

function Documents() {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-3xl font-semibold text-blue-600 mb-8 text-center">
        Upload Required Documents
      </h3>

      <div className="space-y-6 mb-8">
        {/* GST Certificate */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">
            GST Certificate
          </label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Aadhar Card */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">
            Aadhar Card
          </label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Company PAN Card */}
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">
            Company PAN Card
          </label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <Link to="/Pitch_desk">
          <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            PREVIOUS
          </button>
        </Link>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Documents;
