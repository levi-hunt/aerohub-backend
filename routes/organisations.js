// routes/org.js
import { Router } from 'express';
const router = Router();

import orgWriteDb from '../controllers/orgController.js';

router.route('/:id')
    .get(async (req, res) => {
        res.send("Single org ID here");
    })
    .put(async (req, res) => {
        res.send("This updates an unique org");
    })
    .delete(async (req, res) => {
        res.send("This will delete an unique org");
    })

router.route('/')
    .get(async (req, res) => {
        res.send("Returns every org");
    })
    .post(orgWriteDb)

export default router;
