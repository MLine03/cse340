const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Vehicle detail page
router.get("/detail/:id", inventoryController.buildVehicleDetail);

module.exports = router;
