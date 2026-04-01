import express from 'express';
import { getAccountPage, updateAccount, logout } from '../controllers/accountController.js';
const router = express.Router();

// Account management
router.get('/', getAccountPage);
router.post('/update', updateAccount);
router.get('/logout', logout);

export default router;