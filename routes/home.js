const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory-model');

// Home page
router.get('/', async (req, res) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render('home', { vehicles });
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).render('error', { message: 'Unable to fetch vehicles' });
  }
});

// Vehicle detail page
router.get('/vehicle/:id', async (req, res) => {
  try {
    const vehicle = await inventoryModel.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).render('error', { message: 'Vehicle not found' });
    }
    res.render('vehicle-detail', { vehicle });
  } catch (err) {
    console.error('Error fetching vehicle:', err);
    res.status(500).render('error', { message: 'Unable to fetch vehicle' });
  }
});

module.exports = router;