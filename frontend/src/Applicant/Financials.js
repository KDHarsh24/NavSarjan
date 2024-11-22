import React from "react";
import { Link } from "react-router-dom";

function Financials() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <form className="space-y-8">
        {/* Current Stage Section */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-6">Current Stage</h3>
          <div>
            <h4 className="text-xl font-medium text-blue-600 mb-4">Funding Stage</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Bootstrapped",
                "Friends & Family",
                "Seed/Angel Funded",
                "Pre Series",
                "Series A or beyond",
              ].map((stage, index) => (
                <label key={index} className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span className="ml-2 text-gray-700">{stage}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Target Fundraise Section */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-6">Target Fundraise</h3>
          <div>
            <h4 className="text-xl font-medium text-blue-600 mb-4">Are you raising funds?</h4>
            <label className="block mb-4">
              <span className="text-gray-700">How much are you looking to raise (in USD)?</span>
              <input
                type="text"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Target fundraise for upcoming round (in USD)"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">Tentative valuation (in USD)</span>
              <input
                type="text"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tentative valuation for upcoming round (in USD)"
              />
            </label>
            <h4 className="text-xl font-medium text-blue-600 mb-4">Funding Against</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Open to all", "Convertible Notes", "Debt", "Digital Tokens", "Equity"].map(
                (option, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span className="ml-2 text-gray-700">{option}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Revenue Stage Section */}
        <div>
          <h3 className="text-3xl font-semibold text-blue-700 mb-6">Revenue Stage</h3>
          <h4 className="text-xl font-medium text-blue-600 mb-4">Current Revenue Stage</h4>
          <div className="space-y-2">
            {["Pre Revenue", "Post Revenue"].map((stage, index) => (
              <label key={index} className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2 text-gray-700">{stage}</span>
              </label>
            ))}
          </div>
          <h4 className="text-xl font-medium text-blue-600 mt-6 mb-4">Time to Commercialise?</h4>
          <div className="space-y-2">
            {["0-6 months", "6-12 months", "12-36 months", "More than 36 months"].map(
              (timeframe, index) => (
                <label key={index} className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span className="ml-2 text-gray-700">{timeframe}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Link to="/Team">
            <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              PREVIOUS
            </button>
          </Link>
          <Link to="/Industry">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
              NEXT
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Financials;
