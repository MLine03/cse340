const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventoryController');

// Detail view
router.get('/detail/:inv_id', invController.buildDetailView);

// Management view
router.get('/', invController.managementView);

// Add Classification
router.get('/add-classification', invController.addClassificationView);
router.post('/add-classification', invController.addClassification);

// Add Inventory
router.get('/add-inventory', invController.addInventoryView);
router.post('/add-inventory', invController.addInventory);

// Trigger 500 error
router.get('/cause-error', invController.triggerError);

module.exports = router;