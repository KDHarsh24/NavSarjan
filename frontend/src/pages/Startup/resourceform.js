import React, { useState } from 'react';
//import { Input } from '@/components/ui/input';
//import { Textarea } from '@/components/ui/textarea';
//import { select, selectContent, selectItem, selectTrigger, selectValue } from '@/components/ui/select';
//import { Button } from '@/components/ui/button';
//import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
//import { Label } from '@/components/ui/label';
//import { Checkbox } from '@/components/ui/checkbox';
//import { Separator } from '@/components/ui/separator';

import Input from '@mui/material/Input';
import Textarea from '@mui/material/TextareaAutosize';
import { 
  Select, 
  SelectChangeEvent, 
  MenuItem 
} from '@mui/material/Select';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardTitle from '@mui/material/Typography'; // MUI doesn't have direct CardTitle
import CardDescription from '@mui/material/Typography'; // Similar for description
import Label from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Separator from '@mui/material/Divider'; // Equivalent to Separator

// First, install MUI:
// npm install @mui/material @emotion/react @emotion/styled

// Comprehensive Resource Categories
const RESOURCE_CATEGORIES = {
  'Physical Infrastructure': [
    'Laboratory Space',
    'Office Space',
    'Prototyping Workshop',
    'Clean Room Facility',
    'Specialized Research Area',
    'Manufacturing Pilot Zone',
    'Shared Maker Space',
    'Conference and Presentation Halls',
    'Server Room/Data Center',
    'Innovation Sandbox'
  ],
  'Technical Equipment': [
    '3D Printing Machines',
    'CNC Machining Centers',
    'Robotics Prototyping Kit',
    'High-Performance Computing Cluster',
    'Advanced Microscopy Systems',
    'Spectroscopy Equipment',
    'Biomedical Research Instruments',
    'Electronic Design Workstations',
    'Semiconductor Fabrication Tools',
    'Renewable Energy Testing Apparatus',
    'Precision Measurement Devices',
    'Chemical Analysis Instruments'
  ],
  'Digital and Computational Resources': [
    'High-Speed Internet Connectivity',
    'Cloud Computing Credits',
    'AI and Machine Learning Platforms',
    'Specialized Software Licenses',
    'Cybersecurity Infrastructure',
    'Data Analytics Tools',
    'Virtual Collaboration Platforms',
    'Blockchain Development Environments',
    'Quantum Computing Access',
    'Advanced Simulation Software'
  ],
  'Intellectual Property and Legal Support': [
    'Patent Filing Assistance',
    'Legal Consultation Services',
    'Intellectual Property Workshops',
    'Trademark Registration Support',
    'Technology Transfer Guidance',
    'Compliance Advisory Services'
  ],
  'Networking and Mentorship': [
    'Industry Expert Mentorship',
    'Investor Networking Sessions',
    'Global Market Access Program',
    'Startup Ecosystem Connections',
    'International Collaboration Opportunities',
    'Cross-Industry Innovation Forums'
  ],
  'Financial and Business Support': [
    'Seed Funding Opportunities',
    'Grant Writing Workshops',
    'Investment Readiness Program',
    'Financial Planning Consultation',
    'Revenue Model Development',
    'Business Strategy Coaching'
  ],
  'Research and Development Support': [
    'Research Grant Assistance',
    'R&D Collaboration Platforms',
    'Scientific Literature Access',
    'Research Methodology Training',
    'Cross-Institutional Research Partnerships',
    'Innovation Acceleration Programs'
  ],
  'Talent and Human Resources': [
    'Talent Recruitment Support',
    'Skill Development Workshops',
    'Internship Programs',
    'Technical Training Resources',
    'Entrepreneurship Skill Development',
    'Diversity and Inclusion Initiatives'
  ]
};

const AdvancedResourceRequestForm = () => {
  const [formData, setFormData] = useState({
    // Basic Startup Information
    startupName: '',
    startupStage: '',
    founderName: '',
    foundedDate: '',
    
    // Contact Information
    email: '',
    contactNumber: '',
    alternateContact: '',
    
    // Detailed Startup Profile
    industryDomain: '',
    businessModel: '',
    socialImpact: '',
    
    // Resource Request Details
    requestedResources: [],
    urgencyLevel: 'medium',
    projectTimeline: '',
    
    // Detailed Justification
    resourceJustification: '',
    expectedOutcomes: '',
    potentialImpact: '',
    
    // Additional Information
    previousFunding: '',
    teamSize: '',
    additionalDetails: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceToggle = (resource) => {
    setFormData(prev => {
      const currentResources = prev.requestedResources;
      const newResources = currentResources.includes(resource)
        ? currentResources.filter(r => r !== resource)
        : [...currentResources, resource];
      
      return {
        ...prev,
        requestedResources: newResources
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Basic validation
    const requiredFields = [
      'startupName', 'startupStage', 'founderName', 'foundedDate',
      'email', 'contactNumber', 'industryDomain', 
      'businessModel', 'resourceJustification'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Resource selection validation
    if (formData.requestedResources.length === 0) {
      newErrors.requestedResources = 'Please select at least one resource';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real-world scenario, this would be an API call
      console.log('Submitted Advanced Resource Request:', formData);
      alert('Resource request submitted successfully for policy review!');
      
      // Optional: Reset form
      // setFormData({ ... initial state ... });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Comprehensive Startup Resource Request
          </CardTitle>
          <CardDescription className="text-center">
            A detailed submission for innovative startups seeking incubation and resource support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Startup Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Startup Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Startup Name</Label>
                  <Input
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleChange}
                    placeholder="Official startup name"
                  />
                  {errors.startupName && <p className="text-red-500 text-sm">{errors.startupName}</p>}
                </div>
                
                <div>
                  <Label>Startup Stage</Label>
                  <select
                    name="startupStage"
                    value={formData.startupStage}
                    onValueChange={(value) => setFormData(prev => ({...prev, startupStage: value}))}
                  >
                    <selectTrigger>
                      <selectValue placeholder="select startup stage" />
                    </selectTrigger>
                    <selectContent>
                      {['Ideation', 'Prototype', 'MVP', 'Early Revenue', 'Scaling', 'Growth'].map(stage => (
                        <selectItem key={stage} value={stage}>{stage}</selectItem>
                      ))}
                    </selectContent>
                  </select>
                  {errors.startupStage && <p className="text-red-500 text-sm">{errors.startupStage}</p>}
                </div>
                
                <div>
                  <Label>Founder Name</Label>
                  <Input
                    name="founderName"
                    value={formData.founderName}
                    onChange={handleChange}
                    placeholder="Primary founder/contact"
                  />
                  {errors.founderName && <p className="text-red-500 text-sm">{errors.founderName}</p>}
                </div>
                
                <div>
                  <Label>Founded Date</Label>
                  <Input
                    type="date"
                    name="foundedDate"
                    value={formData.foundedDate}
                    onChange={handleChange}
                  />
                  {errors.foundedDate && <p className="text-red-500 text-sm">{errors.foundedDate}</p>}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Official contact email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                
                <div>
                  <Label>Primary Contact Number</Label>
                  <Input
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Primary phone number"
                  />
                  {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
                </div>
                
                <div>
                  <Label>Alternate Contact</Label>
                  <Input
                    name="alternateContact"
                    value={formData.alternateContact}
                    onChange={handleChange}
                    placeholder="Alternate contact information"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Detailed Startup Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Industry Domain</Label>
                  <select
                    name="industryDomain"
                    value={formData.industryDomain}
                    onValueChange={(value) => setFormData(prev => ({...prev, industryDomain: value}))}
                  >
                    <selectTrigger>
                      <selectValue placeholder="select industry domain" />
                    </selectTrigger>
                    <selectContent>
                      {[
                        'AI and Machine Learning', 
                        'Biotechnology', 
                        'Clean Energy', 
                        'Cybersecurity', 
                        'EdTech', 
                        'FinTech', 
                        'Healthcare', 
                        'Internet of Things', 
                        'Robotics', 
                        'Sustainable Technologies'
                      ].map(domain => (
                        <selectItem key={domain} value={domain}>{domain}</selectItem>
                      ))}
                    </selectContent>
                  </select>
                  {errors.industryDomain && <p className="text-red-500 text-sm">{errors.industryDomain}</p>}
                </div>
                
                <div>
                  <Label>Business Model</Label>
                  <select
                    name="businessModel"
                    value={formData.businessModel}
                    onValueChange={(value) => setFormData(prev => ({...prev, businessModel: value}))}
                  >
                    <selectTrigger>
                      <selectValue placeholder="select business model" />
                    </selectTrigger>
                    <selectContent>
                      {[
                        'B2B', 
                        'B2C', 
                        'B2G', 
                        'Marketplace', 
                        'Subscription', 
                        'Freemium', 
                        'On-Demand', 
                        'Platform'
                      ].map(model => (
                        <selectItem key={model} value={model}>{model}</selectItem>
                      ))}
                    </selectContent>
                  </select>
                  {errors.businessModel && <p className="text-red-500 text-sm">{errors.businessModel}</p>}
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Social Impact Description</Label>
                <Textarea
                  name="socialImpact"
                  value={formData.socialImpact}
                  onChange={handleChange}
                  placeholder="Describe the potential social impact of your startup"
                  rows={3}
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Comprehensive Resource selection */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Resource Request</h2>
              {Object.entries(RESOURCE_CATEGORIES).map(([category, resources]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-medium mb-3">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {resources.map((resource) => (
                      <div key={resource} className="flex items-center space-x-2">
                        <Checkbox
                          id={resource}
                          checked={formData.requestedResources.includes(resource)}
                          onCheckedChange={() => handleResourceToggle(resource)}
                        />
                        <Label htmlFor={resource} className="text-sm">{resource}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {errors.requestedResources && <p className="text-red-500 text-sm">{errors.requestedResources}</p>}
            </div>

            <Separator className="my-6" />

            {/* Detailed Resource Justification */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Resource Justification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Urgency Level</Label>
                  <select
                    name="urgencyLevel"
                    value={formData.urgencyLevel}
                    onValueChange={(value) => setFormData(prev => ({...prev, urgencyLevel: value}))}
                  >
                    <selectTrigger>
                    <selectValue placeholder="select urgency level" />
                  </selectTrigger>
                  <selectContent>
                    {['Low', 'Medium', 'High', 'Critical'].map(level => (
                      <selectItem key={level} value={level}>{level}</selectItem>
                    ))}
                  </selectContent>
                  </select>
                </div>
                
                <div>
                  <Label>Project Timeline</Label>
                  <Input
                    type="date"
                    name="projectTimeline"
                    value={formData.projectTimeline}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Resource Justification</Label>
                <Textarea
                  name="resourceJustification"
                  value={formData.resourceJustification}
                  onChange={handleChange}
                  placeholder="Explain how these resources will support your startup's goals"
                  rows={4}
                />
                {errors.resourceJustification && <p className="text-red-500 text-sm">{errors.resourceJustification}</p>}
              </div>
              
              <div className="mt-4">
                <Label>Expected Outcomes</Label>
                <Textarea
                  name="expectedOutcomes"
                  value={formData.expectedOutcomes}
                  onChange={handleChange}
                  placeholder="Describe the specific outcomes you anticipate from these resources"
                  rows={3}
                />
              </div>
              
              <div className="mt-4">
                <Label>Potential Impact</Label>
                <Textarea
                  name="potentialImpact"
                  value={formData.potentialImpact}
                  onChange={handleChange}
                  placeholder="Elaborate on the broader impact of your startup"
                  rows={3}
                />
              </div>
            </div>

            <Separator className="my-6" />

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Context</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Previous Funding</Label>
                  <Input
                    name="previousFunding"
                    value={formData.previousFunding}
                    onChange={handleChange}
                    placeholder="Total funding raised to date"
                  />
                </div>
                
                <div>
                  <Label>Team Size</Label>
                  <Input
                    type="number"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    placeholder="Number of team members"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <Label>Additional Details</Label>
                <Textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share"
                  rows={3}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-12 py-3 bg-primary hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Submit Resource Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedResourceRequestForm;