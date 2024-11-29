import React from "react";
import { Link } from "react-router-dom";

function Industry() {
    const industryDomains = [
        "Horizontal", "AgriTech", "Cyber Security", "Drones", "Enterprise SaaS", "Food", "Hardware", "Language Deeptech",
        "Mobility", "Robotics", "Sustainability & Environment", "Waste Management", "Adtech", "B2B Ecommerce Platform", 
        "Data Analytics", "Deeptech/AI/ML", "Education", "Entertainment & Media", "Gaming", "Healthcare", "Legal Tech", 
        "Smart City", "Clean Energy", "IT Services", "Material Sciences", "Retail", "Supply Chain & Logistics", 
        "Web3", "Aerospace", "Big Data", "Electric Vehicles", "Finance", "Gaming & Mobile Applications", "Pet", 
        "Smart Manufacturing", "Telecom", "Textile", "Travel and Leisure"
    ];

    const technologyDomains = [
        "3D Printing", "5G", "AI/ML", "Analytics", "API", "AR-VR-MR", "Automation", "Battery", "Big Data", "Biometrics", 
        "Blockchain", "Cloud Computing", "Computer Vision", "Drone", "Electric Powertrains", "Electric Vehicles", 
        "Energy Storage", "Generative AI", "Genomics", "Geospatial & Space Tech", "Hardware", "IAAS", "IoT", 
        "Logistics", "Micro-Mobility", "Mobile App", "Nanotechnology", "NLP/ Deep Learning", "Other", "PAAS", 
        "Quantum Computing", "Robotics", "SAAS", "Software", "Web Platform"
    ];

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">Industry/Technology</h1>

            {/* Industry Domains Section */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Industry Domains</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {industryDomains.map((domain) => (
                        <label
                            key={domain}
                            className="inline-flex items-center text-sm text-gray-700 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                name="industry-domain"
                                value={domain}
                                className="form-checkbox text-blue-600 focus:ring-2 focus:ring-blue-500"
                                aria-label={domain}
                            />
                            <span className="ml-2">{domain}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Technology Domains Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Choose Technology Domains</h2>
                <p className="text-sm text-gray-500 mb-6">Select a maximum of 2 options</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {technologyDomains.map((tech) => (
                        <label
                            key={tech}
                            className="inline-flex items-center text-sm text-gray-700 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                name="technology-domain"
                                value={tech}
                                className="form-checkbox text-blue-600 focus:ring-2 focus:ring-blue-500"
                                aria-label={tech}
                            />
                            <span className="ml-2">{tech}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between items-center">
                <Link to="/Financials">
                    <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition duration-300">
                        PREVIOUS
                    </button>
                </Link>
                <Link to="/Pitch_Desk">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
                        NEXT
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Industry;
 