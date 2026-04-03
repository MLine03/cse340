export const accountSession = (req, res, next) => {
  // Check for JWT cookie
  const token = req.cookies.token;
  if (token) {
    res.locals.loggedIn = true;
  } else {
    res.locals.loggedIn = false;
  }
  next();
};