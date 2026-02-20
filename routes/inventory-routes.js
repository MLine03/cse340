const express = require("express")
const router = express.Router()
const invController = require("../controllers/inventory-controller")
const utilities = require("../utilities") // index.js re-exports handleErrors

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId)
)

router.get(
  "/trigger-error",
  utilities.handleErrors(invController.triggerError)
)

module.exports = router