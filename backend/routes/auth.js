// routes/auth.js
const express = require('express');
const router = express.Router();

// Sample route
router.post('/login', (req, res) => {
  res.json({ message: 'Login API hit' });
});

module.exports = router;
