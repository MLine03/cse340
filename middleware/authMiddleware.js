const jwt = require('jsonwebtoken');

function requireLogin(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.render('accounts/login', { message: 'Please log in.' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.accountData = payload;
    next();
  } catch (err) {
    return res.render('accounts/login', { message: 'Invalid token. Please log in.' });
  }
}

module.exports = { requireLogin };