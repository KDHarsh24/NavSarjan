import React from "react";
import { Link } from "react-router-dom";

function Financials() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-6">
        {/* Current Stage Section */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Current Stage</h3>
          <div>
            <h4 className="text-xl font-medium text-orange-500 mb-2">Funding Stage</h4>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Bootstrapped</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Friends & Family</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Seed/Angel Funded</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Pre Series</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Series A or beyond</span>
              </label>
            </div>
          </div>
        </div>

        {/* Target Fundraise Section */}
        <div>
          <h3 className="text-2xl font-semibold text-orange-600 mb-4">Target Fundraise</h3>
          <div>
            <h4 className="text-xl font-medium text-orange-500 mb-2">Are you raising funds?</h4>
            <label className="block text-sm mb-2">
              How much are you looking to raise (in USD)?
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Target fundraise for upcoming round (in USD)"
              />
            </label>
            <label className="block text-sm mb-4">
              Tentative valuation (in USD)
              <input
                type="text"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Tentative valuation for upcoming round (in USD)"
              />
            </label>

            <div>
              <h4 className="text-xl font-medium text-orange-500 mb-2">Funding Against</h4>
              <div className="space-y-2">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Open to all</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Convertible Notes</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Debt</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Digital Tokens</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Equity</span>
                </label>
              </div>
            </div>
          </div>

          <h4 className="text-xl font-medium text-orange-500 mt-6 mb-2">Ongoing Commitments</h4>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Do you have any ongoing commitments for the upcoming funding round?</span>
          </label>
        </div>

        {/* Revenue Stage Section */}
        <div className="mt-6">
          <h4 className="text-xl font-medium text-orange-500 mb-4">Revenue Stage</h4>
          <h4 className="text-lg font-medium text-orange-400 mb-2">Current Revenue Stage</h4>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Pre Revenue</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Post Revenue</span>
            </label>
          </div>

          <h4 className="text-lg font-medium text-orange-400 mt-4 mb-2">Time to Commercialise?</h4>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">0-6 months</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">6-12 months</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">12-36 months</span>
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">More than 36 months</span>
            </label>
          </div>
        </div>

        {/* Submit and Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-500"
          >
            Save
          </button>
          <Link to="/Industry">
            <button className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-500">
              Next
            </button>
          </Link>
        </div>   
      </form>

      <div className="mt-4 text-center">
        <button className="px-6 py-2 bg-white border border-orange-600 text-orange-600 rounded-md hover:bg-orange-100">
          Previous
        </button>
      </div>
    </div>
  );
}

export default Financials;
