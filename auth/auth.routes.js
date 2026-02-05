import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock user (normally from DB)
const user = {
  id: 1,
  email: 'test@example.com',
  password: 'password123',
  role: 'user'
};

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email || password !== user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = {
    id: user.id,
    role: user.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  });

  res.json({ message: 'Login successful' });
});

// LOGOUT
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({ message: 'Logged out successfully' });
});

export default router;
