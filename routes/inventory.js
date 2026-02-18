const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

// Inventory pages
router.get("/", inventoryController.showInventory)
router.get("/add-classification", inventoryController.showAddClassification)
router.get("/add-inventory", inventoryController.showAddInventory)

// Handle form submissions
router.post("/add-classification", inventoryController.addClassification)
router.post("/add-inventory", inventoryController.addInventory)

module.exports = router
