// controllers/accountsController.js
const accountsModel = require('../models/accountsModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginPage = (req, res) => {
    res.render('account/login', { message: null });
};

exports.loginProcess = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await accountsModel.getAccountByEmail(email);
        if (!account) {
            return res.render('account/login', { message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, account.password);
        if (!match) {
            return res.render('account/login', { message: 'Invalid email or password' });
        }

        // create JWT token
        const payload = {
            account_id: account.account_id,
            account_type: account.account_type,
            firstname: account.firstname
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.cookie('jwt', token, { httpOnly: true, maxAge: 7200000 });
        res.redirect('/account');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Account Management Page
exports.accountManagement = async (req, res) => {
    res.render('account/account-management', { user: req.user });
};

// Account Update Page
exports.updateAccountPage = async (req, res) => {
    const account = await accountsModel.getAccountById(req.params.id);
    res.render('account/update-account', { account, message: null, errors: null });
};

// Account Update POST
exports.updateAccount = async (req, res) => {
    try {
        const { account_id, firstname, lastname, email } = req.body;

        const exists = await accountsModel.getAccountByEmail(email);
        if (exists && exists.account_id != account_id) {
            return res.render('account/update-account', { account: req.body, errors: ['Email already exists'], message: null });
        }

        await accountsModel.updateAccount({ account_id, firstname, lastname, email });
        const updatedAccount = await accountsModel.getAccountById(account_id);

        res.render('account/account-management', { user: updatedAccount, message: 'Account updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Password Update POST
exports.updatePassword = async (req, res) => {
    try {
        const { account_id, password } = req.body;

        if (password.length < 8) {
            return res.render('account/update-account', { account: req.body, errors: ['Password must be at least 8 characters'], message: null });
        }

        const hashed = await bcrypt.hash(password, 10);
        await accountsModel.updatePassword(account_id, hashed);
        const updatedAccount = await accountsModel.getAccountById(account_id);

        res.render('account/account-management', { user: updatedAccount, message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
};