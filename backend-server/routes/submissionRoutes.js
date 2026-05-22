const express = require('express');
const router = express.Router();
const { submitTask, getAllSubmissions } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

// Security check for Admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Student route
router.post('/submit', protect, submitTask);

// ---> NEW: Admin route to view all student submissions
router.get('/all', protect, adminOnly, getAllSubmissions);

module.exports = router;