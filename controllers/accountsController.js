import { updateAccountData } from '../models/accountModel.js';

export function getAccountPage(req, res) {
  const user = req.session.user;
  if (!user) return res.redirect('/account/login');
  res.render('account-management', { user });
}

export async function updateAccount(req, res, next) {
  try {
    const { name, email, password } = req.body;
    await updateAccountData(req.session.user.id, name, email, password);
    res.redirect('/account');
  } catch (err) {
    next(err);
  }
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
}