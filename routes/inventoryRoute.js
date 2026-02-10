const express = require("express")
const router = express.Router()
const invCont = require("../controllers/inventoryController")
const utilities = require("../utilities")

// Management
router.get("/", utilities.handleErrors(invCont.buildManagement))

// Add Classification
router.get("/add-classification", utilities.handleErrors(invCont.buildAddClassification))
router.post("/add-classification", invCont.addClassification)

// Add Inventory
router.get("/add-inventory", utilities.handleErrors(invCont.buildAddInventory))
router.post("/add-inventory", invCont.addInventory)

module.exports = router
