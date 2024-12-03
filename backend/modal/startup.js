import mongoose from "mongoose";

const startupSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      industry: [{
        type: String
      }],
      description: {
        type: String
      },
      founder: {
        type: String
      },
      founderuserid: {
        type: String
      },
      coFounders: [{
        type: String
      }],
      model: [{
        type: String
      }],
      funding: {
        type: String
      },
      established: {
        type: String
      },
      logo: {
        type: String
      },
      images: [{
        type: String
      }],
      social: [{
        type: String
      }],
      incorporated: {
        type: Boolean,
        default: false
      },
      address: {
        type: String
      },
      pitch: {
        type: String
      },
      documents: [{
        type: String
      }],
      products: [{
        type: String
      }],
      website: {
        type: String
      },
      graph: {
        label: {
          type: String
        },
        data: [{
          type: Number
        }]
      }
});

const startUp = mongoose.model('startUp', startupSchema,'startUp');

export default startUp;