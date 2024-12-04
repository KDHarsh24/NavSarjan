import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; // For password hashing
import jwt from 'jsonwebtoken'; // For generating tokens
import User from './model/user.js'; // User model definition
import startUpRoutes from './Route/startUpRoute.js';


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
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('<h6>Welcome to the Navsarjan Backend</h6>');
});

app.use('/home/startUp', startUpRoutes); // Ensure 'startUpRoutes' is correctly defined and matches API paths

// Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful', user: { id: newUser._id, email: newUser.email, name: newUser.name } });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Validate user input (recommended)
    // ...
    const check = await collection.findOne({ user: username });
    if (check) {
      res.status(409).json("exists"); // Use more specific status code
    } else {
      res.json("notexist");
      // Add user creation logic if applicable
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

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

// User Model (models/User.js)

