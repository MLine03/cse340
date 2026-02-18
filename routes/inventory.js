const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")

router.get("/", inventoryController.index)
router.get("/add-classification", inventoryController.showAddClassification)
router.get("/add-inventory", inventoryController.showAddInventory)

module.exports = router
