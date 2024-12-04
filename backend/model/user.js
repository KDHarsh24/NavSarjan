import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// Define the social media schema
const socialSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,  // Optional now
  },
  address: {
    type: String,  // Optional now
  },
  profession: {
    type: String,  // Optional now
  },
  social: [socialSchema], // Array of social media accounts
  photo: {
    type: String, // URL of the user's profile picture (optional)
  },
  role: {
    type: String,
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 rounds of salt
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Compare provided password with hashed password
};

// Update the updatedAt field whenever the document is modified
userSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedAt = Date.now(); // Set updatedAt to the current time
  }
  next();
});


export default mongoose.model('User', userSchema, 'user');