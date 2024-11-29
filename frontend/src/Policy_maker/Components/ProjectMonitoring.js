import { useState } from "react";
import React from "react";
import projects from "./data/projects.json";

const ProjectMonitoring = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800">
        Project Monitoring and Management
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Project List */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Project List</h3>
          <div className="mt-4 h-48 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="text-gray-700 cursor-pointer hover:text-blue-500"
                  onClick={() => setSelectedProject(project)}
                >
                  {project.name} - {project.description}, Status: {project.status}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">Project Details</h3>
          <div className="mt-4 h-48 overflow-y-auto custom-scrollbar">
            {selectedProject ? (
              <div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {selectedProject.name}
                </h4>
                <p className="text-gray-700">{selectedProject.description}</p>
                <p className="text-gray-700">Status: {selectedProject.status}</p>
              </div>
            ) : (
              <p className="text-gray-700">
                Click on a project to view more details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMonitoring;
