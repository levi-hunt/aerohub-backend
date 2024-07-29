import { Router } from 'express';
const router = Router();

import hazardController from '../controllers/hazardController.js';
// import hazardValidators from '../validators/hazardValidators.js'

// router.route('/:hazard_id')
//     .get(hazardValidators.valHazardGet, hazardController.hazardGetUnique)
//     .put(hazardValidators.valHazardPut, hazardController.hazardUpdateUnique)
//     .delete(hazardController.hazardDelete)

router.route('/')
    .get(hazardController.hazardGetAll)
    .post(hazardValidators.valCreateHazard, hazardController.createHazard);

export default router;