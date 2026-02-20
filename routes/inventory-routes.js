const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventory-controller');

// Management view
router.get('/', invController.showManagement);

// Add classification
router.get('/add-classification', invController.addClassificationView);
router.post('/add-classification', invController.addClassification);

// Add vehicle
router.get('/add-vehicle', invController.addVehicleView);
router.post('/add-vehicle', invController.addVehicle);

module.exports = router;