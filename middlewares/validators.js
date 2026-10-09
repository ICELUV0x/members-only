const { body } = require('express-validator');

exports.signUpValidators = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ max: 255 }).withMessage('First name too long'),

  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ max: 255 }).withMessage('Last name too long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),

  body('password')
    .trim()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

exports.logInValidators = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
];