// controllers/authController.js
import { getAccountByEmail, createAccount } from '../models/accountmodel.js';
import bcrypt from 'bcryptjs';

export const loginView = (req, res) => res.render('auth/login', { errors: null });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !password) errors.push('All fields are required.');

  const account = await getAccountByEmail(email);
  if (!account) errors.push('Invalid email or password.');

  if (account && !(await bcrypt.compare(password, account.password)))
    errors.push('Invalid email or password.');

  if (errors.length) return res.render('auth/login', { errors });

  req.session.account = {
    id: account.account_id,
    firstname: account.firstname,
    lastname: account.lastname,
    email: account.email,
  };

  res.redirect('/account/manage');
};

export const registerView = (req, res) => res.render('auth/register', { errors: null });

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email || !password) errors.push('All fields are required.');
  if (password && password.length < 8) errors.push('Password must be at least 8 characters.');

  if (await getAccountByEmail(email)) errors.push('Email already in use.');
  if (errors.length) return res.render('auth/register', { errors });

  const hashedPassword = await bcrypt.hash(password, 10);
  await createAccount({ firstname, lastname, email, password: hashedPassword });

  res.redirect('/auth/login');
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};