import React from 'react'

const Feedback = ()=>{
    return(
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Feedback and Surveys</h2>
            <div className="space-y-4 mt-6">
              <button className="bg-yellow-500 text-white p-3 rounded-lg mr-5">Create Survey</button>
              <button className="bg-blue-500 text-white p-3 rounded-lg">View Feedback</button>
            </div>
        </div>
    );
}

export default Feedback;