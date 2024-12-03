import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String
});

const SocialSchema = new mongoose.Schema({
  platform: String,
  url: String
});

const StartupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: [String],
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
    type: [String],
    default: [],
  },
  model: {
    type: [String],
    default: [],
  },
  funding: {
    type: String,
    default: "0",
  },
  established: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default: "",
  },
  images: {
    type: [String],
    default: [],
  },
  social: {
    type: [SocialSchema], // Updated to accept object structure
    default: [],
  },
  incorporated: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  pitch: {
    type: String,
    default: "",
  },
  documents: [{
    title: String,
    url: String
  }], // Updated to match document structure in data
  products: {
    type: [ProductSchema], // Updated to accept object structure
    default: [],
  },
  website: {
    type: String,
    default: "",
  },
  graph: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
}, {
  timestamps: true,
});

export default mongoose.model("Startup", StartupSchema, "startup");