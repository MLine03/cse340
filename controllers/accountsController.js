const accountsModel = require('../models/accounts-model');
const bcrypt = require('bcrypt');

async function manageAccount(req, res) {
  const { account_id, first_name, account_type } = res.locals.accountData;

  res.render('accounts/manage', {
    first_name,
    account_type,
    account_id,
  });
}

async function getUpdateAccount(req, res) {
  const account_id = req.params.id;
  const account = await accountsModel.getAccountById(account_id);
  res.render('accounts/update', { account, message: null, errors: null });
}

async function postUpdateAccount(req, res) {
  try {
    const { account_id, first_name, last_name, email } = req.body;
    const errors = await accountsModel.validateAccountUpdate(account_id, email);
    if (errors.length > 0) {
      const account = await accountsModel.getAccountById(account_id);
      return res.render('accounts/update', { account, message: null, errors });
    }
    await accountsModel.updateAccount(account_id, first_name, last_name, email);
    const account = await accountsModel.getAccountById(account_id);
    res.render('accounts/manage', { first_name: account.first_name, account_type: account.account_type, account_id });
  } catch (err) {
    res.render('accounts/update', { account: req.body, message: 'Update failed', errors: [err.message] });
  }
}

async function postChangePassword(req, res) {
  try {
    const { account_id, new_password } = req.body;
    if (!new_password || new_password.length < 8) {
      const account = await accountsModel.getAccountById(account_id);
      return res.render('accounts/update', { account, message: null, errors: ['Password must be at least 8 characters'] });
    }
    const hashed = await bcrypt.hash(new_password, 10);
    await accountsModel.updatePassword(account_id, hashed);
    const account = await accountsModel.getAccountById(account_id);
    res.render('accounts/manage', { first_name: account.first_name, account_type: account.account_type, account_id });
  } catch (err) {
    res.render('accounts/update', { account: req.body, message: 'Password update failed', errors: [err.message] });
  }
}

module.exports = { manageAccount, getUpdateAccount, postUpdateAccount, postChangePassword };