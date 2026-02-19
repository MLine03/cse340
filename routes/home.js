const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventory-model");

router.get("/", async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render("index", { title: "Home", vehicles });
  } catch (error) {
    next(error);
  }
});

module.exports = router;