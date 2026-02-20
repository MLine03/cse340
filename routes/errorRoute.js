const express = require('express');
const router = express.Router();

router.get('*', (req, res) => {
  res.status(404).render('error', { 
    title: '404 - Not Found',
    message: 'The page you requested does not exist.',
    nav: [
      { name: 'Home', link: '/' },
      { name: 'Inventory', link: '/inventory' },
    ]
  });
});

module.exports = router;