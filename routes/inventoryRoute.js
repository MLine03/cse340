const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventoryController")
const utilities = require("../utilities")

// Detail Route
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(inventoryController.getInventoryDetail)
)

// Intentional 500 Error Route
router.get(
  "/error",
  utilities.handleErrors(inventoryController.triggerError)
)

module.exports = router