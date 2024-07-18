import { validationResult, body, param } from 'express-validator';

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
    body('address.address_line1')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Address line 1 must be at most 100 characters long'),
    body('address.address_line2')
        .optional()
        .trim()
        .isLength({ max: 100 }).withMessage('Address line 2 must be at most 100 characters long'),
    body('address.suburb')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Suburb must be at most 50 characters long'),
    body('address.state')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('State must be at most 50 characters long'),
    body('address.postal_code')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('Postal code must be at most 20 characters long'),
    body('address.country')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Country must be at most 50 characters long'),
    body('contact.phone')
        .optional()
        .trim()
        .isMobilePhone().withMessage('Must be a valid phone number'),
    body('contact.mobile')
        .optional()
        .trim()
        .isMobilePhone().withMessage('Must be a valid mobile number'),
    body('contact.fax')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('Fax must be at most 20 characters long'),
    body('dates.probationary_date')
        .optional()
        .isISO8601().toDate().withMessage('Must be a valid date'),
    body('dates.performance_review_date')
        .optional()
        .isISO8601().toDate().withMessage('Must be a valid date'),
    body('documents.passport_number')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Passport number must be at most 50 characters long'),
    body('documents.passport_nationality')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Passport nationality must be at most 50 characters long'),
    body('documents.passport_expiry_date')
        .optional()
        .isISO8601().toDate().withMessage('Must be a valid date'),
    body('documents.drivers_license_number')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Drivers license number must be at most 50 characters long'),
    body('documents.frequent_flyer_number')
        .optional()
        .trim()
        .isLength({ max: 50 }).withMessage('Frequent flyer number must be at most 50 characters long'),
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