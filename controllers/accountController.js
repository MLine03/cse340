const accountModel = require('../models/accountModel');
const bcrypt = require('bcrypt');

exports.manageAccount = async (req, res) => {
    const account = res.locals.accountData;
    res.render('account/manage', { account });
};

exports.updateAccountView = async (req, res) => {
    const id = req.params.id;
    const account = await accountModel.getAccountById(id);
    res.render('account/update', { account, errors: null, message: null });
};

exports.updateAccountInfo = async (req, res) => {
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
    res.render('account/manage', { account, message: 'Account updated successfully!' });
};

exports.updatePassword = async (req, res) => {
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
    res.render('account/manage', { account, message: 'Password updated successfully!' });
};