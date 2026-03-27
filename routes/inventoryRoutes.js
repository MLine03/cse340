// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Show add vehicle form
router.get('/add-vehicle', inventoryController.showAddVehicleForm);

// Handle form submission
router.post('/add-vehicle', inventoryController.handleAddVehicle);

// Show vehicle details
router.get('/vehicle/:id', inventoryController.showVehicleDetail);

module.exports = router;