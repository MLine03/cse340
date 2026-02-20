// middleware/auth.js
import jwt from 'jsonwebtoken';

export function checkJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.account = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}

// Authorization middleware for Employee/Admin
export function checkEmployeeOrAdmin(req, res, next) {
  const account = res.locals.account;
  if (account && (account.account_type === 'Employee' || account.account_type === 'Admin')) {
    return next();
  }
  return res.render('login', { message: 'Access denied. Please log in with proper account.' });
}