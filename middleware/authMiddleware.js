import jwt from "jsonwebtoken";

export const checkJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.redirect("/accounts/login");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.account = payload; // account info from token
    next();
  } catch (err) {
    return res.redirect("/accounts/login");
  }
};