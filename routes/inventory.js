const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.listVehicles);
router.get("/:inv_id", inventoryController.vehicleDetail);

module.exports = router;