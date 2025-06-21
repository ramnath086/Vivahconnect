const express = require('express');
const router = express.Router();

// Sample GET endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Users route working ✅' });
});

// Sample POST endpoint
router.post('/register', (req, res) => {
  const { name, email } = req.body;
  res.json({ message: `User ${name} with email ${email} registered.` });
});

module.exports = router;
