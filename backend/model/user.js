import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be a valid 10-digit number'],
  },
  image: {
    type: String,
    default: null,
  },
  social: {
    type: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    _id: false,
    default: null,
  },
  dob: {
    type: String,
    required: true,
  },
}, { timestamps: false, versionKey: false });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema, 'user');
