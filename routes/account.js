// routes/account.js
import express from 'express';
import { manageAccount, updateAccountView, updateAccountInfo, updateAccountPassword } from '../controllers/accountController.js';

const router = express.Router();

router.get('/manage', manageAccount);
router.get('/update/:id', updateAccountView);
router.post('/update/info', updateAccountInfo);
router.post('/update/password', updateAccountPassword);

export default router;