import React from "react";
import { Link } from "react-router-dom";

function Industry() {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">Industry/Technology</h1>

            <div>
                <h2 className="text-2xl font-semibold text-orange-600 mb-4">Select Industry Domains</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        "Horizontal", "AgriTech", "Cyber Security", "Drones", "Enterprise SaaS", "Food", "Hardware", "Language Deeptech",
                        "Mobility", "Robotics", "Sustainability & Environment", "Waste Management", "Adtech", "B2B Ecommerce Platform", 
                        "Data Analytics", "Deeptech/AI/ML", "Education", "Entertainment & Media", "Gaming", "Healthcare", "Legal Tech", 
                        "Smart City", "Clean Energy", "IT Services", "Material Sciences", "Retail", "Supply Chain & Logistics", 
                        "Web3", "Aerospace", "Big Data", "Electric Vehicles", "Finance", "Gaming & Mobile Applications", "Pet", 
                        "Smart Manufacturing", "Telecom", "Textile", "Travel and Leisure"
                    ].map((domain) => (
                        <label className="inline-flex items-center text-sm text-gray-700" key={domain}>
                            <input type="checkbox" name="industry-domain" value={domain} className="form-checkbox text-orange-600" />
                            <span className="ml-2">{domain}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold text-orange-600 mb-4">Choose Technology Domains</h2>
                <p className="text-sm text-gray-500 mb-4">Select a maximum of 2 options</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                        "3D Printing", "5G", "AI/ML", "Analytics", "API", "AR-VR-MR", "Automation", "Battery", "Big Data", "Biometrics", 
                        "Blockchain", "Cloud Computing", "Computer Vision", "Drone", "Electric Powertrains", "Electric Vehicles", 
                        "Energy Storage", "Generative AI", "Genomics", "Geospatial & Space Tech", "Hardware", "IAAS", "IoT", 
                        "Logistics", "Micro-Mobility", "Mobile App", "Nanotechnology", "NLP/ Deep Learning", "Other", "PAAS", 
                        "Quantum Computing", "Robotics", "SAAS", "Software", "Web Platform"
                    ].map((tech) => (
                        <label className="inline-flex items-center text-sm text-gray-700" key={tech}>
                            <input type="checkbox" name="technology-domain" value={tech} className="form-checkbox text-orange-600" />
                            <span className="ml-2">{tech}</span>
                        </label>
                    ))}
                </div>   
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button className="px-6 py-2 bg-white border border-orange-600 text-orange-600 rounded-md hover:bg-orange-50 transition duration-300">
                    PREVIOUS
                </button>
                <Link to="/Pitch_Desk">
                    <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition duration-300">
                        NEXT
                    </button>
                </Link>
            </div>

            <div className="mt-4 text-center">
                <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition duration-300">
                    SAVE
                </button>
            </div>
        </div>
    );
}

export default Industry;
