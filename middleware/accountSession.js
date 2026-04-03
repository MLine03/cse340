import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const accountSession = (req, res, next) => {
  const token = req.cookies.token;
  req.account = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.account = decoded;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      res.clearCookie("token");
    }
  }
  next();
};