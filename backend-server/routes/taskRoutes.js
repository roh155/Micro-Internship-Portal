const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Quick Admin Middleware to check the user role
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// POST: Create a task (Requires token AND admin role)
router.post('/create', protect, adminOnly, createTask);

// GET: Fetch all tasks (Requires token, but any role can view)
router.get('/', protect, getTasks);

module.exports = router;