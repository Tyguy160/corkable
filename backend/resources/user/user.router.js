const { body } = require('express-validator');
const auth = require('../../middleware/auth');
const { Router } = require('express');

const {
  createUser,
  updateUser,
  login,
  currentUser,
} = require('./user.controller');

const router = Router({ mergeParams: true });

// Create a new user
router.post(
  '/',
  [
    body('name', 'Please enter your name').not().isEmpty(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    body('age', 'Must be at least 13 to sign up').isInt({ min: 13 }),
  ],
  createUser
);

// Update an existing user
router.put('/:userId', auth, updateUser);

// Log in the user
router.post(
  '/login',
  [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
  ],
  login
);

// Get current logged in user
router.get('/', auth, currentUser);

module.exports = router;
