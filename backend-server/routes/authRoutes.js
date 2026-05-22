const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Route for creating a new account: POST /api/auth/register
router.post('/register', registerUser);

// Route for logging in: POST /api/auth/login
router.post('/login', loginUser);

module.exports = router;