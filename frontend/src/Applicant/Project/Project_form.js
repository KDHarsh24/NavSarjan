import React from 'react';
import {Link} from 'react-router-dom';

const ProjectForm = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black mb-6">Project Details</h1>

      <form className="grid grid-cols-1 gap-6">
        {/* Project Title */}
        <div className="p-2">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Project Title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          />
        </div>

        {/* Category */}
        <div className="p-2">
          <select
            id="category"
            name="category"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: '#f6f6f6' }}
          >
            <option>Category</option>
            <option>C1</option>
            <option>C2</option>
            <option>C3</option>
          </select>
        </div>

        {/* Description and Image Upload */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Project Description"
              className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="file-upload"
              className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
              <div className="text-center">
                <button
                  type="button"
                  className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4"
                >
                  Select from the computer
                </button>
                <p className="text-gray-500">or drag file here</p>
                <p className="text-gray-500 text-sm mt-1">pdf,doc</p>
              </div>
            </label>
            <input
              id="file-upload"
              name="file"
              type="file"
              accept="pdf/doc*"
              className="sr-only"
            />
          </div>
        </div>


        {/* Organizer Information */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              id="author-name"
              name="author-name"
              placeholder="Author Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>

          <div>
            <input
              type="email"
              id="author-email"
              name="author-email"
              placeholder="Author Email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Start and End Date */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              Start Date
            </span>
            <input
              type="datetime-local"
              id="start-date"
              name="start-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>

          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              End Date
            </span>
            <input
              type="datetime-local"
              id="end-date"
              name="end-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Status and Tags */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <select
              id="status"
              name="status"
              className="block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50"
              style={{ backgroundColor: '#f6f6f6' }}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags (comma-separated)"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50"
              style={{ backgroundColor: '#f6f6f6' }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-full mt-6 p-2">
          <Link to="/dashboard">
          <button
            type="submit"
            className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
          >
            Submit
          </button>
          </Link>
          
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
