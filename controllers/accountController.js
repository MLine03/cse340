// controllers/accountController.js
import * as accountModel from '../models/accountmodel.js';
import bcrypt from 'bcryptjs';

// Views
export const loginView = (req, res) => res.render('auth/login', { errors: null });
export const registerView = (req, res) => res.render('auth/register', { errors: null });

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !password) errors.push('All fields are required.');

  const account = await accountModel.getAccountByEmail(email);
  if (!account) errors.push('Invalid email or password.');

  if (account && !(await bcrypt.compare(password, account.password))) {
    errors.push('Invalid email or password.');
  }

  if (errors.length) return res.render('auth/login', { errors });

  req.session.account = {
    id: account.account_id,
    firstname: account.firstname,
    lastname: account.lastname,
    email: account.email,
  };

  res.redirect('/account/manage');
};

// Register
export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email || !password) errors.push('All fields are required.');
  if (password && password.length < 8) errors.push('Password must be at least 8 characters.');
  if (await accountModel.getAccountByEmail(email)) errors.push('Email already in use.');

  if (errors.length) return res.render('auth/register', { errors });

  const hashedPassword = await bcrypt.hash(password, 10);
  await accountModel.createAccount({ firstname, lastname, email, password: hashedPassword });

  res.redirect('/auth/login');
};

// Logout
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

// Account management
export const manageAccount = async (req, res) => {
  try {
    const account = res.locals.accountData;
    res.render('account/manage', { account, message: null, errors: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Update account view
export const updateAccountView = async (req, res) => {
  try {
    const account = await accountModel.getAccountById(req.params.id);
    res.render('account/update', { account, errors: null, message: null });
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/500', { error: err });
  }
};

// Update account info
export const updateAccountInfo = async (req, res) => {
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
};

// Update password
export const updatePassword = async (req, res) => {
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
};