import React from 'react'

const Reports = ()=>{
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Analytics and Reports</h2>
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800">Visual Data Reports</h3>
                {/* Placeholder for graphs/charts */}
                <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-700">
                  Graphs and charts placeholder
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800">Downloadable Reports</h3>
                <ul className="space-y-2 mt-4">
                  <li className="text-gray-700">
                    <a href="#" className="text-blue-600">Project Performance Report (PDF)</a>
                  </li>
                  <li className="text-gray-700">
                    <a href="#" className="text-blue-600">Funding Allocation (Excel)</a>
                  </li>
                </ul>
              </div>
            </div>
        </div>
    );
}

export default Reports;