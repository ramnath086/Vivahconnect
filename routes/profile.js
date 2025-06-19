// backend/routes/profile.js
const express = require('express');
const router = express.Router();

// Sample GET profile route
router.get('/', (req, res) => {
  res.json({ message: 'Get all profiles' });
});

// Sample POST profile route
router.post('/', (req, res) => {
  const profile = req.body; // In real app, you'd validate and save to DB
  res.status(201).json({ message: 'Profile created', profile });
});

module.exports = router;
