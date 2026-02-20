// routes/auth.js
import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', login);

router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', register);

export default router;