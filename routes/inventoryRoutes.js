// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

// Display all vehicles
router.get('/', inventoryController.listInventory);

// Display vehicle detail
router.get('/:inv_id', inventoryController.vehicleDetail);

module.exports = router;