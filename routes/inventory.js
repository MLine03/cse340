// routes/inventory.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

// Vehicle detail route
router.get("/detail/:inv_id", inventoryController.showVehicleDetail);

module.exports = router;