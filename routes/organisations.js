import { Router } from 'express';
const router = Router();

import orgController from '../controllers/orgController.js';
import orgValidators from '../validators/orgValidators.js'

router.route('/:org_id')
    .get(orgValidators.valOrgGet, orgController.orgGetUnique)
    .put(orgValidators.valOrgPut, orgController.orgUpdateUnique)
    .delete(orgValidators.valOrgDelete, orgController.orgDelete)

router.route('/')
    .get(orgController.orgGetAll)
    .post(orgValidators.valOrgPost, orgController.orgWriteDb)

export default router;
