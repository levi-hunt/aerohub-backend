import { validationResult, body } from 'express-validator';

const valGetUser = [
    param('user_id')
        .trim()
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer')
        .toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

const valUpdateUser = [
    param('user_id')
        .trim()
        .notEmpty().withMessage('User ID is required')
        .isInt({ min: 1 }).withMessage('User ID must be a positive integer')
        .toInt(),
    body('first_name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('Firstname must be between 1 and 50 characters')
        .isAlpha(),
    body('last_name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('Lastname must be between 1 and 50 characters')
        .isAlpha(),
    body('primary_email')
        .optional()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 }).withMessage('Email must be at most 255 characters long'),
    body('password')
        .optional()
        .trim()
        .isStrongPassword().withMessage("Password is not strong enough"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

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
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
]

export default { valGetUser, valUpdateUser, valCreateUser }