import React from 'react';

const GujaratStartupPolicy = () => {
    const policies = [
        {
            title: "Scheme for Assistance for Startups/Innovation",
            details: [
                "Seed support: Up to INR 30 lakh in seed support",
                "Sustenance allowance: INR 20,000 per month for startups, and INR 25,000 per month for women-led startups",
                "Soft skills training: Up to INR 1 lakh for training",
                "Additional assistance: Up to INR 10 lakh for startups with a significant social impact",
                "Acceleration program: Up to INR 3 lakh for participation in national or international acceleration programs",
            ],
        },
        {
            title: "Student Startup and Innovation Policy (SSIP)",
            details: ["Supports startups at the proof of concept or minimum viable product stage"],
        },
        {
            title: "Sector-specific schemes",
            details: ["Supports startups in specific sectors, such as IT-ITeS, Electronics, and Biotech"],
        },
        {
            title: "Interest subsidy",
            details: ["8% interest subsidy per annum for up to 3 years on loans from scheduled banks or financial institutions"],
        },
    ];

    const applicationSteps = [
        "Register",
        "Get a unique identification number",
        "Apply for assistance",
    ];

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Gujarat Startup Policies</h1>
            <p className="text-gray-700 text-lg mb-6">
                The Gujarat government offers a variety of startup policies to support startups at different stages of their life cycle.
            </p>

            {policies.map((policy, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{policy.title}</h2>
                    <ul className="list-disc pl-5 text-gray-700">
                        {policy.details.map((detail, idx) => (
                            <li key={idx} className="mb-1">{detail}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <div className="bg-blue-100 p-4 rounded-md mt-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">How to Apply</h3>
                <ol className="list-decimal pl-5 text-gray-700">
                    {applicationSteps.map((step, index) => (
                        <li key={index} className="mb-1">{step}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default GujaratStartupPolicy;