const express = require('express');
const router = express.Router();

router.use((err, req, res, next) => {
  console.error('Error handler:', err);
  res.status(500).render('error', {
    title: '500 - Server Error',
    message: err.message,
    nav: getNav(),
  });
});

function getNav() {
  return [
    { name: 'Home', link: '/' },
    { name: 'Inventory', link: '/inventory' },
    { name: 'Add Classification', link: '/add-classification' },
    { name: 'Add Inventory', link: '/add-inventory' },
  ];
}

module.exports = router;