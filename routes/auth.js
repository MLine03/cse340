import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.get('/login', (req, res) => res.render('auth/login', { errors: [] }));
router.post('/login', login);

router.get('/register', (req, res) => res.render('auth/register', { errors: [] }));
router.post('/register', register);

export default router;