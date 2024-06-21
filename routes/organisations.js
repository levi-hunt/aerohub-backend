// routes/org.js
import { Router } from 'express';
const router = Router();

import orgController from '../controllers/orgController.js';

router.route('/:org_id')
    .get(orgController.orgGetUnique)
    .put(orgController.orgUpdateUnique)
    .delete(async (req, res) => {
        res.send("This will delete an unique org");
    })

router.route('/')
    .get(orgController.orgGetAll)
    .post(orgController.orgWriteDb)

export default router;
