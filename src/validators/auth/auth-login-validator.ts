import { body } from 'express-validator';

const loginValidatorRules = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isString(),
];

export default loginValidatorRules;
