import React from 'react'

const Document = ()=>{
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Document and File Management</h2>
            <div className="space-y-4 mt-6">
              <button className="bg-green-500 text-white p-3 rounded-lg mr-5">Upload Document</button>
              <button className="bg-yellow-500 text-white p-3 rounded-lg">Download File</button>
            </div>
        </div>
    );
}

export default Document;