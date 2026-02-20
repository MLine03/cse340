// controllers/inventory-controller.js

const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

// Controller for vehicle detail page
async function buildVehicleDetail(req, res, next) {
  const inv_id = req.params.inv_id;

  try {
    // Get vehicle data by ID
    const vehicle = await inventoryModel.getVehicleById(inv_id);

    if (!vehicle) {
      // If vehicle not found, throw 404
      const error = new Error("Vehicle not found");
      error.status = 404;
      throw error;
    }

    // Build HTML for the vehicle
    const vehicleHTML = utilities.buildVehicleHTML(vehicle);

    // Render the detail view
    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicleHTML,
    });
  } catch (err) {
    next(err); // Pass errors to the error handler
  }
}

module.exports = { buildVehicleDetail };