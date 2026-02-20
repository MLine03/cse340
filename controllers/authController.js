// controllers/authController.js
import bcrypt from 'bcryptjs';
import { getAccountByEmail, createAccount } from '../utils/db-connection.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const account = await getAccountByEmail(email);

  if (!account) {
    return res.render('auth/login', { errors: ['Invalid email or password'], email });
  }

  const passwordMatch = await bcrypt.compare(password, account.password);
  if (!passwordMatch) {
    return res.render('auth/login', { errors: ['Invalid email or password'], email });
  }

  req.session.accountId = account.account_id;
  res.redirect('/account');
};

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const errors = [];

  if (!firstname || !lastname || !email || !password) errors.push('All fields are required.');
  if (password.length < 8) errors.push('Password must be at least 8 characters.');

  const emailExists = await getAccountByEmail(email);
  if (emailExists) errors.push('Email already in use.');

  if (errors.length > 0) {
    return res.render('auth/register', { errors, firstname, lastname, email });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createAccount(firstname, lastname, email, hashedPassword);

  res.redirect('/auth/login');
};