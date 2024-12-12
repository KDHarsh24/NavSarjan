import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  Input,
  TextareaAutosize,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  InputLabel,
  FormControlLabel,
  Divider
} from '@mui/material';
import { useLocation } from 'react-router-dom';

// Comprehensive Resource Categories
const RESOURCE_CATEGORIES = {
  'Physical Infrastructure': [
    'Laboratory Space',
    'Prototyping Workshop',
    'Conference Rooms',
    'Clean Room Facility',
    'Innovation Sandbox'
  ],
  'Technical Equipment': [
    '3D Printers',
    'High-Performance Computers',
    'Spectroscopy Tools',
    'Electronic Design Workstations'
  ],
  'Digital Resources': [
    'Cloud Credits',
    'AI/ML Platforms',
    'Data Analytics Tools',
    'Advanced Simulation Software'
  ],
  'Legal and IP Support': [
    'Patent Filing Assistance',
    'Trademark Registration Support',
    'Compliance Guidance'
  ],
  'Networking and Mentorship': [
    'Mentorship Programs',
    'Investor Connections',
    'Global Market Access'
  ]
};

const ResourceRequestForm = () => {
  const location = useLocation();
  const { name, id } = location.state || {};
  const [formData, setFormData] = useState({
    requestedResources: [],
    additionalResource: '',
    urgencyLevel: 'medium',
    resourceJustification: '',
    additionalDetails: '',
    timeAndDateNeeded: ''
  });
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [allInstitutes, setAllInstitutes] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utility functions
  const formatDate = (date) => date.toISOString().split('T')[0];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Fetch institutes from MongoDB
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('http://localhost:5001/api/fetch', {
          collectionName: 'institute',
          condition: {}, // Fetch all institutes
          projection: {} // Fetch all fields
        });

        if (response.data.success) {
          setAllInstitutes(response.data.data);
          setFilteredInstitutes(response.data.data);
        } else {
          throw new Error('Failed to fetch institutes');
        }
      } catch (err) {
        console.error('Error fetching institutes:', err);
        setError('Failed to load institutes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  // Derive all categories from fetched institutes
  const allCategories = useMemo(() => {
    const categories = new Set();
    allInstitutes.forEach(institute => {
      institute.categories.forEach(category => categories.add(category));
    });
    return Array.from(categories);
  }, [allInstitutes]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    return Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
  }, [currentMonth]);

  // Filter institutes based on available dates and selected categories
  useEffect(() => {
    const filtered = allInstitutes.filter(institute => {
      const hasAvailableDate = institute.availableDates.some(dateRange => {
        const start = new Date(dateRange.start);
        return start.getMonth() === currentMonth.getMonth() &&
               start.getFullYear() === currentMonth.getFullYear();
      });

      const matchesCategories = selectedCategories.length === 0 || 
        selectedCategories.some(category => institute.categories.includes(category));

      return hasAvailableDate && matchesCategories;
    });

    setFilteredInstitutes(filtered);
  }, [currentMonth, selectedCategories, allInstitutes]);

  // Handle resource toggle for request form
  const handleResourceToggle = (resource) => {
    setFormData((prev) => {
      const currentResources = prev.requestedResources;
      const newResources = currentResources.includes(resource)
        ? currentResources.filter((r) => r !== resource)
        : [...currentResources, resource];

      return { ...prev, requestedResources: newResources };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.requestedResources.length === 0 && !formData.additionalResource.trim()) {
      newErrors.requestedResources = 'Please select at least one resource or specify an additional one.';
    }
    if (!formData.resourceJustification.trim()) {
      newErrors.resourceJustification = 'Resource justification is required.';
    }
    if (!formData.timeAndDateNeeded) {
      newErrors.timeAndDateNeeded = 'Please select a time and date for the resources.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare the resource request data to match the backend schema
        const resourceRequestData = {
          categories: [
            ...formData.requestedResources,
            ...(formData.additionalResource ? [formData.additionalResource] : [])
          ],
          reason: formData.resourceJustification,
          urgency: formData.urgencyLevel.charAt(0).toUpperCase() + formData.urgencyLevel.slice(1), // Capitalize first letter
          date: new Date().toISOString().split('T')[0], // Current date
          startupRequestingid: id, // Replace with actual startup ID
          institute: selectedInstitute ? selectedInstitute.name : 'Not Selected', 
          selectedDate: formData.timeAndDateNeeded ? new Date(formData.timeAndDateNeeded).toISOString().split('T')[0] : '',
          verified: false,
          additionalDetails: formData.additionalDetails || ''
        };

        // Send POST request to backend
        const response = await axios.post('http://localhost:5001/api/insert', {
          collectionName: 'resources',
          data: resourceRequestData
        });

        if (response.data.success) {
          alert('Resource request submitted successfully!');
          console.log('Resource Request Submitted:', response.data);
          
          // Reset form
          setFormData({
            requestedResources: [],
            additionalResource: '',
            urgencyLevel: 'medium',
            resourceJustification: '',
            additionalDetails: '',
            timeAndDateNeeded: ''
          });
          setErrors({});
          setSelectedInstitute(null);
          setSelectedDate(null);
        } else {
          alert('Failed to submit resource request');
        }
      } catch (error) {
        console.error('Error submitting resource request:', error);
        alert('Error submitting resource request');
      }
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const filtered = filteredInstitutes.filter(institute =>
      institute.availableDates.some(dateRange => {
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        return date >= start && date <= end;
      })
    );
    setFilteredInstitutes(filtered);
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    return (
      <>
        {[...Array(firstDayOfMonth)].map((_, index) => (
          <div key={`empty-${index}`} className="p-2 bg-gray-100"></div>
        ))}
        {daysInMonth.map((day) => {
          const isSelected = selectedDate && formatDate(day) === formatDate(selectedDate);
          const hasAvailableInstitutes = filteredInstitutes.some((institute) =>
            institute.availableDates.some((dateRange) => {
              const start = new Date(dateRange.start);
              const end = new Date(dateRange.end);
              return day >= start && day <= end;
            })
          );
          return (
            <div
              key={day.toString()}
              className={`p-2 border cursor-pointer ${isSelected ? 'bg-blue-200' : hasAvailableInstitutes ? 'bg-green-100' : 'bg-gray-100'}`}
              onClick={() => handleDateSelect(day)}
            >
              {day.getDate()}
            </div>
          );
        })}
      </>
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setSelectedDate(null);
    setSelectedInstitute(null);
  };

  const handleApplySubmit = () => {
    if (selectedInstitute && selectedDate) {
      // Update form data with selected institute
      setFormData(prev => ({
        ...prev,
        timeAndDateNeeded: selectedDate.toISOString().split('T')[0]
      }));
      setSelectedInstitute(selectedInstitute);
    } else {
      alert('Please select both an institute and a date.');
    }
  };

  // Render loading or error state if needed
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6">Loading institutes...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader
          title="Resource Request Form"
          subheader="Submit your resource requirements for IPR, Projects, and Startups"
          style={{ textAlign: 'center', padding: '20px 0' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Resource Selection */}
            <Typography variant="h6" gutterBottom>Select Required Resources</Typography>
            {Object.entries(RESOURCE_CATEGORIES).map(([category, resources]) => (
              <div key={category} style={{ marginBottom: '20px' }}>
                <Typography variant="subtitle1" style={{ marginBottom: '10px' }}>{category}</Typography>
                {resources.map((resource) => (
                  <FormControlLabel
                    key={resource}
                    control={
                      <Checkbox
                        checked={formData.requestedResources.includes(resource)}
                        onChange={() => handleResourceToggle(resource)}
                      />
                    }
                    label={resource}
                  />
                ))}
              </div>
            ))}
            <FormControl style={{ marginBottom: '20px', width: '100%' }}>
              <InputLabel htmlFor="additionalResource">Other Resource (if not listed)</InputLabel>
              <Input
                id="additionalResource"
                name="additionalResource"
                value={formData.additionalResource}
                onChange={handleChange}
                placeholder="Specify additional resource"
              />
            </FormControl>
            {errors.requestedResources && (
              <Typography color="error" variant="body2">{errors.requestedResources}</Typography>
            )}

            <Divider style={{ margin: '20px 0' }} />

            {/* Resource Justification */}
            <Typography variant="h6" gutterBottom>Resource Justification</Typography>
            <TextareaAutosize
              name="resourceJustification"
              value={formData.resourceJustification}
              onChange={handleChange}
              placeholder="Explain why these resources are needed"
              minRows={4}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.resourceJustification && (
              <Typography color="error" variant="body2">{errors.resourceJustification}</Typography>
            )}

            <Divider style={{ margin: '20px 0' }} />

            {/* Additional Details */}
            <Typography variant="h6" gutterBottom>Additional Details</Typography>
            <TextareaAutosize
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Provide any additional information or context"
              minRows={3}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />

            <Divider style={{ margin: '20px 0' }} />

            {/* Calendar and Institute Selection */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select Available Date</h2>
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Previous Month
                </button>
                <h3>{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h3>
                <button
                  type="button"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Next Month
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
              </div>
            </div>

            {/* Institute Selection */}
            <Typography variant="h6" gutterBottom>Select Institute</Typography>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel>Available Institutes</InputLabel>
              <Select
                value={selectedInstitute || ''}
                onChange={(e) => setSelectedInstitute(e.target.value)}
                label="Available Institutes"
              >
                {filteredInstitutes.map((institute) => (
                  <MenuItem key={institute.name} value={institute}>
                    {institute.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Time and Date Needed */}
            <div>
              <Typography variant="h6" className="mb-3">Specific Date and Time When Needed</Typography>
              <Input
                type="datetime-local"
                name="timeAndDateNeeded"
                value={formData.timeAndDateNeeded}
                onChange={handleChange}
                fullWidth
              />
              {errors.timeAndDateNeeded && (
                <Typography variant="caption" color="error">{errors.timeAndDateNeeded}</Typography>
              )}
            </div>

            {/* Urgency Level */}
            <FormControl style={{ marginBottom: '20px', width: '100%' }}>
              <InputLabel>Urgency Level</InputLabel>
              <Select
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
            >
              Submit Resource Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceRequestForm;