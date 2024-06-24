import { Router } from 'express';
const router = Router();

import userController from '../controllers/userController.js';
import userValidator from '../validators/userValidators.js';
import auth from '../middlewares/auth.js'

router.route('/:user_id')
    .get()
    .put()
    .delete()

router.route('/')
    .get(auth, userController.getAll)
    .post(auth, userValidator.valCreateUser, userController.createUser);



export default router;
