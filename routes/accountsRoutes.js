// src/routes/accountRoutes.js
import express from 'express';
const router = express.Router();

// Example route for /account
router.get('/', (req, res) => {
  res.render('account', { title: 'Account Page' });
});

export default router;