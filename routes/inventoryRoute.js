const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

// Management view
router.get("/", inventoryController.showManagement)

// Classification
router.get("/add-classification", inventoryController.addClassificationForm)
router.post("/add-classification", inventoryController.addClassification)

// Inventory
router.get("/add-inventory", inventoryController.addInventoryForm)
router.post("/add-inventory", inventoryController.addInventory)

module.exports = router
