import express from 'express';
const router = express.Router();

// 404
router.use((req, res) => {
  res.status(404).render('error', { error: { message: 'Page not found', status: 404 } });
});

// 500 test link
router.get('/error500', (req, res) => {
  throw new Error('Intentional 500 Error');
});

export default router;