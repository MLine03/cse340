const express = require("express")
const router = new express.Router()
const inventoryController = require("../controllers/inventoryController")
const utilities = require("../utilities")

router.get(
  "/type/:classificationId",
  utilities.handleErrors(inventoryController.buildByClassification)
)

router.get(
  "/detail/:invId",
  utilities.handleErrors(inventoryController.buildDetail)
)

module.exports = router
