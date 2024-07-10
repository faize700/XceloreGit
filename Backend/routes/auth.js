const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields including role are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || user.password !== password) { // This is a simple check; consider hashing passwords in production
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    // Set JWT in cookies
    res.cookie('token', token, { httpOnly: true });

    // Return user and token in response
    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clears the JWT token cookie
  res.status(200).json({ message: 'Logout successful' });
});

// Get all users
router.get('/users', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const query = search
    ? { $or: [{ firstName: new RegExp(search, 'i') }, { lastName: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }] }
    : {};

  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields including role are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields including role are required' });
  }

  try {
    await User.findByIdAndUpdate(id, { firstName, lastName, email, password, role }, { new: true });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
