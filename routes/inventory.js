// routes/inventory.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Inventory pages
router.get("/", inventoryController.showInventory);
router.get("/detail/:id", inventoryController.getInventoryDetail); // matches controller
router.get("/add-classification", inventoryController.showAddClassification);
router.post("/add-classification", inventoryController.addClassification);
router.get("/add-inventory", inventoryController.showAddInventory);
router.post("/add-inventory", inventoryController.addInventory);

module.exports = router;