const jwt = require('jsonwebtoken');

function checkLogin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.accountData = payload;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

function checkEmployeeOrAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.render('account/login', { message: 'Login required.' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.accountData = payload;

        if (payload.account_type === 'Employee' || payload.account_type === 'Admin') {
            next();
        } else {
            return res.render('account/login', { message: 'Access denied.' });
        }
    } catch (err) {
        return res.render('account/login', { message: 'Invalid token.' });
    }
}

module.exports = { checkLogin, checkEmployeeOrAdmin };