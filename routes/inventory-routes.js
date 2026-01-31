const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/inventoryController")

router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassification)
)

router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildVehicleDetail)
)

module.exports = router
