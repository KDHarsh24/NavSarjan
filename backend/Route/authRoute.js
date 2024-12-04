const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data and token
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register Route (Optional for creating users)
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ success: false, message: 'Email already exists' });

    const user = await User.create({ email, password, name });
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
