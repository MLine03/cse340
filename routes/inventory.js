const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');
const { checkClassification, checkVehicle } = require('../middleware/validation');

// Management view
router.get('/', invController.buildManagementView);

// Classification routes
router.get('/add-classification', invController.buildAddClassification);
router.post('/add-classification', checkClassification, invController.addClassification);

// Vehicle routes
router.get('/add-vehicle', invController.buildAddVehicle);
router.post('/add-vehicle', checkVehicle, invController.addVehicle);

module.exports = router;