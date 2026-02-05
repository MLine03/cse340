const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const utilities = require("../utilities");

// Management view
router.get("/", inventoryController.buildManagement);

// Add Classification
router.get("/add-classification", inventoryController.buildAddClassification);
router.post(
  "/add-classification",
  utilities.handleErrors(inventoryController.addClassification)
);

// Add Vehicle
router.get("/add-vehicle", inventoryController.buildAddVehicle);
router.post(
  "/add-vehicle",
  utilities.handleErrors(inventoryController.addVehicle)
);

module.exports = router;
