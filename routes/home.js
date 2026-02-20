const express = require('express');
const router = express.Router();
const { getAllVehicles } = require('../models/inventory-model');

router.get('/', async (req, res) => {
  try {
    const vehicles = await getAllVehicles();
    res.render('home', {
      title: 'Home',
      vehicles,
      nav: [
        { name: 'Home', link: '/' },
        { name: 'Inventory', link: '/inventory' },
      ]
    });
  } catch (err) {
    res.render('error', { title: 'Error', message: err.message, nav: [
      { name: 'Home', link: '/' },
      { name: 'Inventory', link: '/inventory' },
    ]});
  }
});

module.exports = router;