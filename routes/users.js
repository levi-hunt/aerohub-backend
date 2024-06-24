import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';

router.route('/:user_id')
    .get()
    .put()
    .delete()

router.route('/')
    .get(userController.getAll)
    .post(userController.createUser);



export default router;
