// backend/routes/interest.js
const express = require('express');
const router = express.Router();

// Sample route to send interest
router.post('/send', (req, res) => {
  const { fromUserId, toUserId } = req.body;
  res.json({ message: `Interest sent from ${fromUserId} to ${toUserId}` });
});

// Sample route to accept interest
router.post('/accept', (req, res) => {
  const { interestId } = req.body;
  res.json({ message: `Interest ${interestId} accepted` });
});

module.exports = router;
