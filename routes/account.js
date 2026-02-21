import express from 'express';
import {
  loginView, login, registerView, register, logout,
  manageAccount, updateAccountView, updateAccountInfo, updatePassword
} from '../controllers/accountController.js';

const router = express.Router();

// Auth routes
router.get('/login', loginView);
router.post('/login', login);
router.get('/register', registerView);
router.post('/register', register);
router.get('/logout', logout);

// Account management
router.get('/manage', manageAccount);
router.get('/update/:id', updateAccountView);
router.post('/update', updateAccountInfo);
router.post('/update-password', updatePassword);

export default router;