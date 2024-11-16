import React from "react";
import { Link } from "react-router-dom";

function Pitch_desk() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-orange-600 mb-6">Upload Pitch Deck</h3>
      <div className="mb-6">
        <label className="block text-lg text-gray-700 mb-2">
          Click or Drop file in this box to upload
        </label>
        <input
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
        />
      </div>

      <h3 className="text-2xl font-semibold text-orange-600 mb-6">Lights, Camera & Action</h3>
      <div className="mb-6">
        <label className="block text-lg text-gray-700 mb-2">
          Upload your Story (Video)
        </label>
        <input
          type="file"
          accept="video/*"
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
        />
      </div>

      <div className="flex justify-between items-center">
        <button className="px-6 py-2 bg-white border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50 transition duration-300">
          PREVIOUS
        </button>
        <Link to="/Documents">
          <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition duration-300">
            NEXT
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Pitch_desk;
