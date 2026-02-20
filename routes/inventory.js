// routes/inventory.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

// Vehicle detail page
router.get("/detail/:inv_id", inventoryController.buildVehicleDetail);

module.exports = router;