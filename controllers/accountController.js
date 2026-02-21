// controllers/accountController.js
import bcrypt from 'bcryptjs';

import {
  getAccountByEmail,
  createAccount,
  getAccountById,
  updateAccount,
  updatePassword as updatePasswordModel, // 🔥 renamed to avoid conflict
} from '../models/accountmodel.js';

/* =========================
   LOGIN VIEW
========================= */
export const loginView = (req, res) => {
  res.render('auth/login', { errors: null });
};

/* =========================
   LOGIN PROCESS
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !password) {
      errors.push('All fields are required.');
    }

    const account = await getAccountByEmail(email);

    if (!account) {
      errors.push('Invalid email or password.');
    }

    if (account && !(await bcrypt.compare(password, account.password))) {
      errors.push('Invalid email or password.');
    }

    if (errors.length > 0) {
      return res.render('auth/login', { errors });
    }

    // Save session
    req.session.account = {
      account_id: account.account_id,
      firstname: account.firstname,
      lastname: account.lastname,
      email: account.email,
    };

    res.redirect('/account/manage');
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};

/* =========================
   REGISTER VIEW
========================= */
export const registerView = (req, res) => {
  res.render('auth/register', { errors: null });
};

/* =========================
   REGISTER PROCESS
========================= */
export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const errors = [];

    if (!firstname || !lastname || !email || !password) {
      errors.push('All fields are required.');
    }

    if (password && password.length < 8) {
      errors.push('Password must be at least 8 characters.');
    }

    const existing = await getAccountByEmail(email);
    if (existing) {
      errors.push('Email already in use.');
    }

    if (errors.length > 0) {
      return res.render('auth/register', { errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createAccount({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};

/* =========================
   LOGOUT
========================= */
export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

/* =========================
   ACCOUNT MANAGEMENT VIEW
========================= */
export const manageAccount = async (req, res) => {
  try {
    const account = res.locals.accountData;
    res.render('account/manage', {
      account,
      message: null,
      errors: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};

/* =========================
   UPDATE ACCOUNT VIEW
========================= */
export const updateAccountView = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await getAccountById(id);

    res.render('account/update', {
      account,
      errors: null,
      message: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};

/* =========================
   UPDATE ACCOUNT INFO
========================= */
export const updateAccountInfo = async (req, res) => {
  try {
    const { account_id, firstname, lastname, email } = req.body;
    const errors = [];

    if (!firstname || !lastname || !email) {
      errors.push('All fields are required.');
    }

    const existing = await getAccountByEmail(email);
    if (existing && existing.account_id != account_id) {
      errors.push('Email already in use.');
    }

    if (errors.length > 0) {
      const account = await getAccountById(account_id);
      return res.render('account/update', {
        account,
        errors,
        message: null,
      });
    }

    await updateAccount(account_id, firstname, lastname, email);

    const updatedAccount = await getAccountById(account_id);

    res.render('account/manage', {
      account: updatedAccount,
      message: 'Account updated successfully!',
      errors: null,
    });

  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};

/* =========================
   UPDATE PASSWORD
========================= */
export const updatePassword = async (req, res) => {
  try {
    const { account_id, password } = req.body;
    const errors = [];

    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters.');
    }

    if (errors.length > 0) {
      const account = await getAccountById(account_id);
      return res.render('account/update', {
        account,
        errors,
        message: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 Using renamed model function
    await updatePasswordModel(account_id, hashedPassword);

    const updatedAccount = await getAccountById(account_id);

    res.render('account/manage', {
      account: updatedAccount,
      message: 'Password updated successfully!',
      errors: null,
    });

  } catch (error) {
    console.error(error);
    res.status(500).render('errors/500', { error });
  }
};