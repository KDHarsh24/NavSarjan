import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InvestorSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  amount: Number,
  document: {
    name: String,
    url: String,
  },
  verified: Boolean,
});

const GraphDataSchema = new Schema({
  label: String,
  revenue: Number,
  profit: Number,
  netProfit: Number,
  document: {
    name: String,
    url: String,
  },
  verified: Boolean,
});

const SocialSchema = new Schema({
  handle: String,
  link: String,
});

const ProductSchema = new Schema({
  name: String,
  description: String,
});

const DocumentSchema = new Schema({
  name: String,
  url: String,
});

const StartupSchema = new Schema({
  name: { type: String, required: true },
  startupid: { type: String, unique: true },
  industry: [String],
  description: String,
  founder: String,
  founderuserid: { type: String, required: true },
  coFounders: [String],
  model: [String],
  funding: Number,
  established: String,
  logo: String,
  images: [String],
  social: [SocialSchema],
  incorporated: Boolean,
  address: String,
  pitch: String,
  documents: [DocumentSchema],
  products: [ProductSchema],
  graph: {
    label: String,
    data: [GraphDataSchema],
  },
  investors: [InvestorSchema],
});
// Export the Model
export default mongoose.model("Startup", StartupSchema, "startup");

