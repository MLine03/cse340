const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { validateClassification, validateInventory } = require('../middleware/validation');

// Management view
router.get('/', inventoryController.showManagementPage);

// Add Classification
router.get('/add-classification', inventoryController.showAddClassificationForm);
router.post('/add-classification', validateClassification, inventoryController.addClassification);

// Add Inventory
router.get('/add-inventory', inventoryController.showAddInventoryForm);
router.post('/add-inventory', validateInventory, inventoryController.addInventory);

// Vehicle Detail View
router.get('/detail/:inv_id', inventoryController.showInventoryDetail);

// Intentional 500 error route
router.get('/trigger-error', inventoryController.triggerError);

module.exports = router;