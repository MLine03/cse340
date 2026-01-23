const express = require("express")
const router = express.Router()
const utilities = require("../utilities")
const invController = require("../controllers/inventoryController")

router.get("/detail/:inv_id", utilities.handleErrors(invController.buildVehicleDetailView))

module.exports = router
