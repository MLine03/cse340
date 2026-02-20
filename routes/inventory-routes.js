const express = require('express')
const router = express.Router()
const invController = require('../controllers/inventory-controller')

// Management view
router.get('/', invController.buildManagementView)

// Add classification
router.get('/add-classification', invController.buildAddClassificationView)
router.post('/add-classification', invController.addClassification)

// Add vehicle
router.get('/add-vehicle', invController.buildAddVehicleView)
router.post('/add-vehicle', invController.addVehicle)

module.exports = router