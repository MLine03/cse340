const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory-controller');

// Home page
router.get('/', (req, res) => res.render('index', { vehicles: [], title: 'Home' }));

// Classification view
router.get('/inventory/classification/:classification_id', inventoryController.showClassification);

// Vehicle detail
router.get('/inventory/detail/:inv_id', inventoryController.showVehicleDetail);

// Footer 500 error
router.get('/trigger-error', inventoryController.triggerError);

module.exports = router;