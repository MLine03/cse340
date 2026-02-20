// controllers/accountController.js
import * as accountModel from '../models/accountmodel.js';
import bcrypt from 'bcryptjs';

// Display account management page
export const manageAccount = async (req, res) => {
  try {
    const account = res.locals.accountData;
    res.render('account/manage', { account, message: null, errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Display account update form
export const updateAccountView = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await accountModel.getAccountById(id);
    res.render('account/update', { account, errors: null, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Update account info
export const updateAccountInfo = async (req, res) => {
  try {
    const { account_id, firstname, lastname, email } = req.body;
    const errors = [];

    if (!firstname || !lastname || !email) errors.push('All fields are required.');

    const emailExists = await accountModel.getAccountByEmail(email);
    if (emailExists && emailExists.account_id != account_id) errors.push('Email already in use.');

    if (errors.length > 0) {
      const account = await accountModel.getAccountById(account_id);
      return res.render('account/update', { account, errors, message: null });
    }

    await accountModel.updateAccount(account_id, firstname, lastname, email);
    const account = await accountModel.getAccountById(account_id);
    res.render('account/manage', { account, message: 'Account updated successfully!', errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Update password
export const updatePassword = async (req, res) => {
  try {
    const { account_id, password } = req.body;
    const errors = [];

    if (!password || password.length < 8) errors.push('Password must be at least 8 characters.');

    if (errors.length > 0) {
      const account = await accountModel.getAccountById(account_id);
      return res.render('account/update', { account, errors, message: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await accountModel.updatePassword(account_id, hashedPassword);

    const account = await accountModel.getAccountById(account_id);
    res.render('account/manage', { account, message: 'Password updated successfully!', errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};