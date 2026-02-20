const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.buildInventory);

router.get("/detail/:inv_id", inventoryController.buildVehicleDetail);

module.exports = router;