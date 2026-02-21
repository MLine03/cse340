// routes/account.js
import express from 'express';
import {
  loginView,
  login,
  registerView,
  register,
  logout,
  manageAccount,
  updateAccountView,
  updateAccountInfo,
  updatePassword,
} from '../controllers/accountController.js';
import { loginRequired } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth routes
router.get('/login', loginView);
router.post('/login', login);
router.get('/register', registerView);
router.post('/register', register);
router.get('/logout', logout);

// Account management routes
router.get('/manage', loginRequired, manageAccount);
router.get('/update/:id', loginRequired, updateAccountView);
router.post('/update', loginRequired, updateAccountInfo);
router.post('/update-password', loginRequired, updatePassword);

export default router;