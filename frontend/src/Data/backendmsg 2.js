import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Base URL for the backend

// General function to send POST requests
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data; // Return the response data
  } catch (error) {
    console.error(`Error in POST request to ${endpoint}:`, error);
    throw error.response ? error.response.data : error;
  }
};

// General function to send GET requests
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in GET request to ${endpoint}:`, error);
    throw error.response ? error.response.data : error;
  }
};

// General function to send DELETE requests
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error in DELETE request to ${endpoint}:`, error);
    throw error.response ? error.response.data : error;
  }
};

// General function to send PUT requests
export const updateData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in PUT request to ${endpoint}:`, error);
    throw error.response ? error.response.data : error;
  }
};
