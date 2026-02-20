// routes/auth.js
import express from 'express';
import { loginView, login, registerView, register, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', loginView);
router.post('/login', login);
router.get('/register', registerView);
router.post('/register', register);
router.post('/logout', logout);

export default router;