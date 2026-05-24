require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS import zaroori hai

const app = express();

// --- MIDDLEWARE ---
// CORS enable karna taaki frontend request bhej sake
app.use(cors({
  origin: ["https://micro-internship-portal-live.pages.dev", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // JSON data parse karne ke liye

// --- ROUTES ---
// Tumhare existing routes yahan aayenge
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

// Root route check
app.get('/', (req, res) => {
  res.send('Micro-Internship API is running...');
});

// --- DATABASE CONNECTION ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database Connection Error:', err);
  });