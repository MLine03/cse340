// routes/inventory.js
const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

// Route: Display all vehicles (optional, useful for classification/home page)
router.get("/", async (req, res, next) => {
  try {
    const inventoryModel = require("../models/inventory-model");
    const vehicles = await inventoryModel.getAllVehicles();

    res.render("inventory/list", {
      title: "All Vehicles",
      vehicles, // array of vehicle objects
    });
  } catch (err) {
    next(err);
  }
});

// Route: Vehicle detail page (assignment 3)
router.get("/detail/:inv_id", inventoryController.buildVehicleDetail);

module.exports = router;