const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Register route with validation
router.post(
  '/register',
  [
    body('username')
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  authController.register
);

// Login route with validation
router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  authController.login
);

// Get current user route
router.get('/me', authenticate, authController.getCurrentUser);

module.exports = router;