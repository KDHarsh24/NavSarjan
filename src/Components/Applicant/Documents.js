import React from "react";

function Documents() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-orange-600 mb-6">Upload Required Documents</h3>

      <div className="space-y-6 mb-6">
        <div>
          <label className="block text-lg text-gray-700 mb-2">GST Certificate</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-700 mb-2">Aadhar Card</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-lg text-gray-700 mb-2">Company PAN Card</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="px-6 py-2 bg-white border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50 transition duration-300">
          PREVIOUS
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition duration-300"
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default Documents;
