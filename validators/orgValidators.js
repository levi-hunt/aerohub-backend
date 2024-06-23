import { check, validationResult, query } from 'express-validator';

const validateOrgUnique = [
    query('org_id').trim().notEmpty().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
]

export default { validateOrgUnique }