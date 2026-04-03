const express = require("express")
const router = express.Router()

// Controllers
const invController = require("../controllers/invController")

// Utilities (FIXED PATH)
const utilities = require("../utilities")

/* ****************************************
* Inventory home (classification view)
* /inv/type/:classificationId
**************************************** */
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

/* ****************************************
* Vehicle detail view
* /inv/detail/:invId
**************************************** */
router.get(
  "/detail/:invId",
  utilities.handleErrors(invController.buildByInvId)
)

module.exports = router