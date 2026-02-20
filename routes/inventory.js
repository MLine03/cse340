const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller');

// Management view
router.get('/', inventoryController.managementView);

// Add Classification
router.get('/add-classification', inventoryController.addClassificationView);
router.post('/add-classification', inventoryController.addClassification);

// Add Vehicle
router.get('/add-vehicle', inventoryController.addVehicleView);
router.post('/add-vehicle', inventoryController.addVehicle);

module.exports = router;