// routes/account.js
import express from 'express';
import {
  manageAccount,
  updateAccountView,
  updateAccountInfo,
  updatePassword
} from '../controllers/accountController.js';

const router = express.Router();

router.get('/', manageAccount);
router.get('/update/:id', updateAccountView);
router.post('/update', updateAccountInfo);
router.post('/update-password', updatePassword);

export default router;