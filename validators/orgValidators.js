import { validationResult, param, body } from 'express-validator';

const valOrgGet = [
    param('org_id')
        .trim()
        .notEmpty().withMessage('Organization ID is required')
        .isInt({ min: 1 }).withMessage('Organization ID must be a positive integer')
        .toInt(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

const valOrgPut = [
    param('org_id')
        .trim()
        .notEmpty().withMessage('Organization ID is required')
        .isInt({ min: 1 }).withMessage('Organization ID must be a positive integer')
        .toInt(),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Company name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z0-9\s.'-]+$/).withMessage('Company name contains invalid characters'),
    body('contact_email')
        .optional()
        .isEmail().withMessage('Must be a valid email address')
        .normalizeEmail()
        .isLength({ max: 255 }).withMessage('Email must be at most 255 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

export default { valOrgGet, valOrgPut };