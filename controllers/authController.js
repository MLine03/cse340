// controllers/authController.js
import bcrypt from 'bcryptjs';
import { getAccountByEmail, createAccount } from '../utils/db-connection.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getAccountByEmail(email);

  if (!user) {
    return res.render('auth/login', { error: 'Email not found.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.render('auth/login', { error: 'Incorrect password.' });
  }

  req.session.user = user;
  res.redirect('/account/manage');
};

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email || !password) {
    errors.push('All fields are required.');
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }

  const existingUser = await getAccountByEmail(email);
  if (existingUser) errors.push('Email already in use.');

  if (errors.length > 0) {
    return res.render('auth/register', { errors });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createAccount(firstname, lastname, email, hashedPassword);

  res.redirect('/auth/login');
};