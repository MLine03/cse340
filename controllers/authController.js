// controllers/authController.js
import { getAccountByEmail, createAccount } from '../utils/db-connection.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const account = await getAccountByEmail(email);
  if (!account || !(await bcrypt.compare(password, account.password))) {
    return res.render('auth/login', { error: 'Invalid email or password' });
  }
  req.session.accountId = account.account_id;
  res.redirect('/account/manage');
};

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];
  if (!firstname || !lastname || !email || !password) errors.push('All fields required');
  if (password && password.length < 8) errors.push('Password must be at least 8 characters');

  const existing = await getAccountByEmail(email);
  if (existing) errors.push('Email already in use');

  if (errors.length > 0) return res.render('auth/register', { errors });

  const hashedPassword = await bcrypt.hash(password, 10);
  await createAccount({ firstname, lastname, email, password: hashedPassword });

  res.redirect('/auth/login');
};