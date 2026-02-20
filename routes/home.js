const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory-model');

router.get('/', async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render('index', { title: 'Jones Surf Shop', nav: getNav(), vehicles });
  } catch (err) {
    next(err);
  }
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