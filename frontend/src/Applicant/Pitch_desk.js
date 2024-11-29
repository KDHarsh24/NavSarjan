import React from "react";
import { Link } from "react-router-dom";

function PitchDesk() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Pitch Deck Upload Section */}
      <h3 className="text-2xl font-semibold text-blue-600 mb-8">Upload Pitch Deck</h3>
      <div className="mb-8">
        <label
          htmlFor="pitch-deck-upload"
          className="block text-lg text-gray-700 mb-3"
        >
          Upload your pitch deck (PDF, PPT, or DOC)
        </label>
        <input
          id="pitch-deck-upload"
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
          aria-label="Upload your pitch deck file"
        />
      </div>

      {/* Video Upload Section */}
      <h3 className="text-2xl font-semibold text-blue-600 mb-8">
        Lights, Camera & Action
      </h3>
      <div className="mb-8">
        <label
          htmlFor="story-video-upload"
          className="block text-lg text-gray-700 mb-3"
        >
          Upload your story (Video)
        </label>
        <input
          id="story-video-upload"
          type="file"
          accept="video/*"
          className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
          aria-label="Upload your story video"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Link to="/Industry">
          <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-300">
            PREVIOUS
          </button>
        </Link>
        <Link to="/Documents">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
            NEXT
          </button>
        </Link> 
      </div>
    </div>
  );
}

export default PitchDesk;
