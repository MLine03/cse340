const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.showInventory);
router.get("/detail/:id", inventoryController.showVehicleDetail);
router.get("/add-classification", (req, res) => res.send("Add Classification Form"));
router.get("/add-inventory", (req, res) => res.send("Add Inventory Form"));

module.exports = router;
