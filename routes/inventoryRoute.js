const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Vehicle detail route
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildVehicleDetail)
)

// Intentional error route
router.get(
  "/trigger-error",
  utilities.handleErrors(invController.triggerError)
)

module.exports = router