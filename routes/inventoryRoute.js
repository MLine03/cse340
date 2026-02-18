const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

// Main inventory management page
router.get("/", inventoryController.showInventory)

// Inventory detail view
router.get("/details/:id", inventoryController.getInventoryDetail)

// Add classification page
router.get("/add-classification", inventoryController.showAddClassification)

// Add inventory page
router.get("/add-inventory", inventoryController.showAddInventory)

// Add vehicle page (if used)
router.get("/add-vehicle", inventoryController.showAddVehicle)

module.exports = router
