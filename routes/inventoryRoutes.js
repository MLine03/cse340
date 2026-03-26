const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.buildInventoryList);
router.get('/detail/:inv_id', inventoryController.buildInventoryDetail);
router.post('/add', inventoryController.addNewVehicle);

module.exports = router;