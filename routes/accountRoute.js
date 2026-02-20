import express from 'express';
const router = express.Router();

// Example route
router.get('/login', (req, res) => {
  res.render('account/login');
});

export default router;