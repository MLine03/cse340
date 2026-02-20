// routes/inventory.js

const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");
const inventoryModel = require("../models/inventory-model");

// Route: list all vehicles
router.get("/", async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render("inventory/list", { title: "All Vehicles", vehicles });
  } catch (err) {
    next(err);
  }
});

// Route: vehicle detail page
router.get("/detail/:inv_id", inventoryController.buildVehicleDetail);

module.exports = router;