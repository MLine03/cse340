const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// List all vehicles
router.get("/", inventoryController.buildVehicleList);

// Vehicle detail page
router.get("/detail/:inv_id", inventoryController.buildVehicleDetail);

module.exports = router;