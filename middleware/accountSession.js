import jwt from "jsonwebtoken";

export const accountSession = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.locals.account = null;
    return next();
  }

  try {
    const account = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.account = account;
  } catch {
    res.locals.account = null;
  }

  next();
};