const express = require("express")
const router = new express.Router()
const inventoryController = require("../controllers/inventoryController")

router.get("/class/:classificationId", inventoryController.buildByClassification)
router.get("/detail/:invId", inventoryController.buildVehicleDetail)

module.exports = router