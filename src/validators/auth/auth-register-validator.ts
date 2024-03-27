import { body } from 'express-validator';

const registerValidationRules = [
  body('firstName').notEmpty().withMessage('fist name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export default registerValidationRules;
