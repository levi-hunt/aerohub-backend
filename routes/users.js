import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';
import userValidator from '../validators/userValidators.js';

router.route('/:user_id')
    .get()
    .put()
    .delete()

router.route('/')
    .get(userController.getAll)
    .post(userValidator.valCreateUser, userController.createUser);



export default router;
