const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller');

router.get('/', inventoryController.managementView);

router.get('/add-classification', inventoryController.addClassificationView);
router.post('/add-classification', inventoryController.addClassification);

router.get('/add-vehicle', inventoryController.addVehicleView);
router.post('/add-vehicle', inventoryController.addVehicle);

module.exports = router;