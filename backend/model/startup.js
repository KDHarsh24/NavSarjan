import mongoose from 'mongoose';

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
  social: [{
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  }],
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
  documents: [{
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  }],
  products: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    }
  }],
  website: {
    type: String, // Website URL
    default: "",
  },
  graph: {
    label: {
      type: String,
      required: true,
    },
    data: [{
      type: mongoose.Schema.Types.Mixed, // Can store different types (integers, strings, etc.)
      required: true,
    }]
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Export the Model
export default mongoose.model('Startup', StartupSchema, 'startup');