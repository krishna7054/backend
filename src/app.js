// src/app.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');

dotenv.config();

const app = express();

// Add this line to allow all origins for CORS (for development purposes)
app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
