const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('VivahConnect Backend is running!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profiles', require('./routes/profile'));
app.use('/api/interests', require('./routes/interest'));

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 10000, () => {
      console.log('Server listening on port', process.env.PORT || 10000);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
