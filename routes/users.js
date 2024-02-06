const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }
    const token = jwt.sign({ userId: user._id }, 'secret-key', {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (err) {
    console.error('Error finding user:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;