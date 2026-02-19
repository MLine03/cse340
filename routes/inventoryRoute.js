const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.showInventory);
router.get("/detail/:id", inventoryController.showVehicleDetail);
router.get("/trigger-error", inventoryController.triggerError);

module.exports = router;