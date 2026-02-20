// controllers/inventory-controller.js
const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function buildVehicleDetail(req, res, next) {
  const inv_id = req.params.inv_id;

  try {
    const vehicle = await inventoryModel.getVehicleById(inv_id);

    if (!vehicle) {
      const error = new Error("Vehicle not found");
      error.status = 404;
      throw error;
    }

    const vehicleHTML = utilities.buildVehicleHTML(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { buildVehicleDetail };