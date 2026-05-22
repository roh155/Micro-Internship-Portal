const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an authorization header starting with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extract the token from the header (Format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using your hidden secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database using the ID from the token
      // We use .select('-password') to ensure we don't accidentally pass the password along
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Token is valid, move on to the next function (the controller)
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token was found in the headers at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Add this below the 'protect' function in authMiddleware.js
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Update your module.exports at the bottom:
module.exports = { protect, adminOnly };