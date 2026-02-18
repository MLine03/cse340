const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

// Example: Inventory detail view
router.get("/details/:id", inventoryController.getInventoryDetail)

// Add other inventory routes here
router.get("/add-classification", inventoryController.showAddClassification)
router.get("/add-inventory", inventoryController.showAddInventory)

module.exports = router
