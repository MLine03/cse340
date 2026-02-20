const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryController");

router.get("/", controller.listVehicles);
router.get("/:inv_id", controller.vehicleDetail);

module.exports = router;