import { check, validationResult, query, param } from 'express-validator';

const validateOrgUnique = [
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

export default { validateOrgUnique };