import React from "react";
import {Link} from "react-router-dom";
function Basic_Info() {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Basic Information
        </h1>

        <form>
          {/* Company Information */}
          <h2 className="text-xl font-bold text-orange-500 mb-4">
            Company Information
          </h2>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-orange-600 mb-2">
              About Company
            </h4>
            <label className="block mb-2">
              <span className="text-orange-700">Company Logo</span>
              <input
                type="file"
                accept="image/*"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Company Name</span>
              <input
                type="text"
                placeholder="Startup Name"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Company Size</span>
              <input
                type="number"
                placeholder="Team Size"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Is your startup incorporated?</span>
              <div className="flex items-center mt-1">
                <span className="mr-4">No</span>
                <input
                  type="checkbox"
                  className="toggle-checkbox h-6 w-6 text-orange-500 focus:ring-2 focus:ring-orange-400"
                />
                <span className="ml-4">Yes</span>
              </div>
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Country</span>
              <input
                type="text"
                placeholder="Country Name"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">State</span>
              <input
                type="text"
                placeholder="State Name"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">City</span>
              <input
                type="text"
                placeholder="City"
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Elevator Pitch</span>
              <input
                type="text"
                placeholder="We help (x) do (y) by doing (z)"
                maxLength={300}
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="block mb-2">
              <span className="text-orange-700">Company Brief</span>
              <textarea
                placeholder="Brief about the company"
                rows={3}
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </label>
          </div>

          {/* Product Stage */}
          <div className="mb-4">
            <span className="text-orange-700 font-medium">Product Stage</span>
            <div className="mt-2">
              {[
                "Idea",
                "Proof of Concept",
                "Prototype Development",
                "Ideation",
                "Minimum Viable Product Developed",
                "Commercialized",
                "Other",
              ].map((stage, index) => (
                <label key={index} className="block text-orange-600">
                  <input
                    type="radio"
                    name="productStage"
                    value={stage}
                    className="mr-2"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </div>

          {/* Business Models */}
          <div className="mb-4">
            <span className="text-orange-700 font-medium">Business Models</span>
            <div className="mt-2">
              {["B2B", "B2B2C", "B2C", "B2G", "D2C"].map((model, index) => (
                <label key={index} className="block text-orange-600">
                  <input
                    type="radio"
                    name="businessModel"
                    value={model}
                    className="mr-2"
                  />
                  {model}
                </label>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <h3 className="text-xl font-bold text-orange-500 mb-4">Social Links</h3>

          {[
            { label: "Website", placeholder: "Enter website URL" },
            { label: "LinkedIn", placeholder: "LinkedIn URL" },
            { label: "Twitter", placeholder: "Twitter URL" },
            { label: "YouTube", placeholder: "YouTube URL" },
            { label: "Facebook", placeholder: "Facebook URL" },
            { label: "Instagram", placeholder: "Instagram URL" },
          ].map((social, index) => (
            <label key={index} className="block mb-2">
              <span className="text-orange-700">{social.label}</span>
              <input
                type="url"
                placeholder={social.placeholder}
                className="w-full mt-1 block px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>
          ))}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Save
            </button>
            <Link to="/Team">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
              Next
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Basic_Info;
