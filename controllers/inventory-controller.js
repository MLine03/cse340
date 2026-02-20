// controllers/inventory-controller.js
const inventoryModel = require("../models/inventory-model");
const utils = require("../utilities");

async function showVehicleDetail(req, res, next) {
  const inv_id = parseInt(req.params.inv_id);

  try {
    const vehicle = await inventoryModel.getVehicleById(inv_id);

    if (!vehicle) {
      return res.status(404).render("error", { title: "Vehicle Not Found", message: "Vehicle not found." });
    }

    const vehicleHTML = utils.buildVehicleDetailHTML(vehicle);

    res.render("inventory/detail", {
      title: `${vehicle.make} ${vehicle.model}`,
      vehicleHTML,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { showVehicleDetail };