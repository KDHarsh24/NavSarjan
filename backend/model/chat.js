const mongoose=require('mongoose');
const chatSchema = new mongoose.Schema({
  message: { type: String, required: true },
  Source: { type: String, required: true },
  Destination: { type: String, required: true },
  Status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema,'Chat');
module.exports=Chat;

