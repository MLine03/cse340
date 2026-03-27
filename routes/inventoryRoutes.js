// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Manage view
router.get('/manage', inventoryController.manageView);

// Add classification
router.post('/classification', inventoryController.addClassification);

// Add vehicle
router.post('/vehicle', inventoryController.addVehicle);

// Vehicle detail
router.get('/detail/:id', inventoryController.vehicleDetail);

module.exports = router;