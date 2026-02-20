import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

export default router;