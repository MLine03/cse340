const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventory-controller")
const utilities = require("../utilities")

router.get(
  "/type/:typeId",
  utilities.handleErrors(inventoryController.buildByClassification)
)

router.get(
  "/detail/:invId",
  utilities.handleErrors(inventoryController.buildVehicleDetail)
)

router.get("/error-test", (req, res) => {
  throw new Error("This is a test error")
})

module.exports = router
