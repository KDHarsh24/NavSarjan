import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './model/user.js';
import startUpRoutes from './Route/startUpRoute.js';
import userAuthRoutes from './Route/authRoute.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const mongoURI = process.env.MONGO_URI || 'your-default-mongo-uri';

// MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('<h6>Welcome to the Navsarjan Backend</h6>');
});

// Create User Endpoint
app.post('/', async (req, res) => {
  try {
    const { name, email, password, address, phone, dob } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse the dob string into a Date object with only date information

    // Create a new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
      dob, // Ensure only the date part is saved
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Send success response
    res.status(201).json({ message: 'Account created successfully!', user: savedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});


// Routes
app.use('/home/startUp', startUpRoutes);
app.use('/home', userAuthRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
