// middleware/authMiddleware.js

export const loginRequired = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/auth/login');
  }

  // Make account data available to all views
  res.locals.accountData = req.session.account;

  next();
};