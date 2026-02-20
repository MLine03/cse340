// routes/home.js
const express = require("express");
const router = express.Router();
const inventoryModel = require("../models/inventory-model");

router.get("/", async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();

    res.render("home", {
      title: "Jones Surf Shop Inventory",
      nav: [
        { name: "Home", link: "/" },
        { name: "Inventory", link: "/inventory" },
        { name: "Add Classification", link: "/classification/add" },
        { name: "Add Inventory", link: "/inventory/add" }
      ],
      vehicles
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;