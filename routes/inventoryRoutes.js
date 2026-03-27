const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Example routes
router.get('/manage', inventoryController.buildManagementView);
router.post('/add-classification', inventoryController.addClassification);
router.post('/add-vehicle', inventoryController.addVehicle);

module.exports = router;