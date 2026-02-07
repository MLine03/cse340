const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventoryController")

// MANAGEMENT VIEW
router.get("/", invController.buildManagement)

// ADD CLASSIFICATION
router.get("/add-classification", invController.buildAddClassification)
router.post("/add-classification", invController.addClassification)

// ADD INVENTORY
router.get("/add-inventory", invController.buildAddInventory)
router.post("/add-inventory", invController.addInventory)

module.exports = router
