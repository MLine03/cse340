// routes/inventoryRoute.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Inventory detail view
router.get("/details/:id", inventoryController.getInventoryDetail);

// Inventory management pages
router.get("/", inventoryController.listInventory);
router.get("/add-classification", inventoryController.showAddClassification);
router.get("/add-inventory", inventoryController.showAddInventory);

module.exports = router;
