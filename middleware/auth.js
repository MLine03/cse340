// middleware/auth.js
export const requireLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/auth/login');
  }
  next();
};

export const setLocals = (req, res, next) => {
  res.locals.accountData = req.session.account || null;
  next();
};