import { Router } from 'express';
import authController from '../controllers/authController.js'
const router = Router();

// Needs validation shi
router.post('/login', authController.loginAuth)

export default router



