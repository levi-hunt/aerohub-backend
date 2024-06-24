import { validationResult, param, body } from 'express-validator';

const valCreateUser = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 1, max: 50 }).withMessage('Firstname must be between 1 and 50 characters')
        .isAlpha(),
    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 1, max: 50 }).withMessage('Lastname must be between 1 and 50 characters')
        .isAlpha(),
    body('primary_email')
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 }).withMessage('Email must be at most 255 characters long'),
    body('password')
        .trim()
        .notEmpty().withMessage('A Password is required')
        .isStrongPassword().withMessage("Password is not strong enough"),
    body('org_id')
        .trim()
        .notEmpty().withMessage('Organization ID is required')
        .isInt({ min: 1 }).withMessage('Organization ID must be a positive integer')
        .toInt(),
]

export default { valCreateUser }