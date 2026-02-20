import express from 'express';
import { checkJWT, checkEmployeeOrAdmin } from '../middleware/auth.js';
import { getAccountById, updateAccount, updatePassword } from '../models/accounts.js';

const router = express.Router();

// Account management page
router.get('/manage', checkJWT, async (req, res) => {
  const account = res.locals.account;
  res.render('account/manage', { account });
});

// Account update page
router.get('/update/:id', checkJWT, async (req, res) => {
  const account = await getAccountById(req.params.id);
  res.render('account/update', { account, errors: null, message: null });
});

// Handle account info update
router.post('/update', checkJWT, async (req, res) => {
  const { account_id, firstname, lastname, email } = req.body;
  try {
    const result = await updateAccount(account_id, firstname, lastname, email);
    res.render('account/manage', { account: result, message: 'Account updated successfully!' });
  } catch (err) {
    res.render('account/update', { account: req.body, errors: err.message, message: null });
  }
});

// Handle password change
router.post('/update-password', checkJWT, async (req, res) => {
  const { account_id, password } = req.body;
  try {
    await updatePassword(account_id, password);
    res.render('account/manage', { account: res.locals.account, message: 'Password updated successfully!' });
  } catch (err) {
    res.render('account/update', { account: res.locals.account, errors: err.message, message: null });
  }
});

export default router;