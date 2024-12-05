import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Represents the progress date
  description: { type: String, required: true }, // Description of the progress
  documents: [
    {
      name: { type: String, required: true }, // Name of the document
      url: { type: String, required: true }, // URL of the document
    },
  ],
});

const investorSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Investor ID
  name: { type: String, required: true }, // Name of the investor
  email: { type: String, required: true }, // Email of the investor
  amount: { type: Number, required: true }, // Amount invested
  document: {
    name: { type: String, required: true }, // Name of the document
    url: { type: String, required: true }, // URL of the document
  },
  verified: { type: Boolean, required: true }, // Verification status
});

const collaboratorSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Collaborator ID
  name: { type: String, required: true }, // Name of the collaborator
  email: { type: String, required: true }, // Email of the collaborator
  role: { type: String, required: true }, // Role of the collaborator
});

const projectSchema = new mongoose.Schema({
  ownerName: { type: String, required: true }, // Name of the owner
  ownerid: { type: String, required: true }, // Email of the owner
  id: { type: Number, required: true }, // Project ID
  name: { type: String, required: true }, // Project name
  description: { type: String, required: true }, // Project description
  technologies: [{ type: String, required: true }], // List of technologies used
  status: { type: String, required: true }, // Current status of the project
  progress: [progressSchema], // Array of progress objects
  completion: { type: Number, required: true }, // Completion percentage
  investors: [investorSchema], // Array of investor objects
  collaborators: [collaboratorSchema], // Array of collaborator objects
});


export default mongoose.model('Project', projectSchema, 'project');