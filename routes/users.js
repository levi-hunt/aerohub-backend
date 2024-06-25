import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';
import userValidator from '../validators/userValidators.js';

router.route('/:user_id')
    .get(userValidator.valGetUser, userController.getUser)
    .put(userValidator.valUpdateUser, userController.updateUser)
    .delete()

router.route('/')
    .get(userController.getAll)
    .post(userValidator.valCreateUser, userController.createUser);



export default router;
