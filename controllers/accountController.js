// controllers/accountController.js
import bcrypt from 'bcryptjs';
import { getAccountById, getAccountByEmail, updateAccount, updatePassword } from '../utils/db-connection.js';

export const manageAccount = async (req, res) => {
  const account = res.locals.accountData;
  res.render('account/manage', { account, message: null, errors: null });
};

export const updateAccountView = async (req, res) => {
  const id = req.params.id;
  const account = await getAccountById(id);
  res.render('account/update', { account, errors: null, message: null });
};

export const updateAccountInfo = async (req, res) => {
  const { account_id, firstname, lastname, email } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email) errors.push('All fields are required.');

  const emailExists = await getAccountByEmail(email);
  if (emailExists && emailExists.account_id != account_id) errors.push('Email already in use.');

  if (errors.length > 0) {
    const account = await getAccountById(account_id);
    return res.render('account/update', { account, errors, message: null });
  }

  await updateAccount(account_id, firstname, lastname, email);
  const account = await getAccountById(account_id);
  res.render('account/manage', { account, message: 'Account updated successfully!', errors: null });
};

export const updateAccountPassword = async (req, res) => {
  const { account_id, password } = req.body;
  const errors = [];

  if (!password || password.length < 8) errors.push('Password must be at least 8 characters.');

  if (errors.length > 0) {
    const account = await getAccountById(account_id);
    return res.render('account/update', { account, errors, message: null });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updatePassword(account_id, hashedPassword);

  const account = await getAccountById(account_id);
  res.render('account/manage', { account, message: 'Password updated successfully!', errors: null });
};