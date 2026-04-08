const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/index")

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))
router.get("/detail/:id", utilities.handleErrors(invController.buildDetail))

// Route to intentionally test error
router.get("/broken", invController.throwError)

module.exports = router