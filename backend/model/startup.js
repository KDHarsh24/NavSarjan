import mongoose from "mongoose";

// Define the Startup Schema
const StartupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: [String], // Array of strings for multiple industries
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  founder: {
    type: String,
    required: true,
  },
  founderuserid: {
    type: String,
    required: true,
  },
  coFounders: {
    type: [String], // Array of co-founder names
    default: [],
  },
  model: {
    type: [String], // Array of business models
    default: [],
  },
  funding: {
    type: String, // Funding amount as a string
    default: "0",
  },
  established: {
    type: String, // Date when the startup was established
    required: true,
  },
  logo: {
    type: String, // URL to the startup's logo
    default: "",
  },
  images: {
    type: [String], // Array of URLs to additional images
    default: [],
  },
  social: {
    type: [{
      platform:{type:String},
      url:{type:String}
    }], // Array of social media links
    default: [],
  },
  incorporated: {
    type: Boolean, // Indicates if the startup is incorporated
    default: false,
  },
  address: {
    type: String, // Address of the startup
    required: true,
  },
  pitch: {
    type: String, // Elevator pitch for the startup
    default: "",
  },
  documents: {
    type: [{
      title:{type: String},
      url:{type:String}
    }], // Array of document URLs
    default: [],
  },
  products: {
    type: [{
      name: { type: String, required: true },
      description: { type: String },
      price: { type: String },
  },], // Array of product names or descriptions
    default: [],
  },
  website: {
    type: String, // Website URL
    default: "",
  },
  graph: {
    type: mongoose.Schema.Types.Mixed, // Object for storing graph-related data
    default: {},
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Model
export default mongoose.model("Startup", StartupSchema, "startup");

