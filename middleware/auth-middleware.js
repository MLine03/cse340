// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.redirect('/account/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info to request
        res.locals.user = decoded; // attach user info to views
        next();
    } catch (err) {
        console.error(err);
        return res.redirect('/account/login');
    }
}

// Middleware to restrict to Employee/Admin only
function restrictToStaff(req, res, next) {
    if (!req.user || !['Employee', 'Admin'].includes(req.user.account_type)) {
        return res.render('account/login', { message: 'Access denied. Login required.' });
    }
    next();
}

module.exports = { verifyJWT, restrictToStaff };