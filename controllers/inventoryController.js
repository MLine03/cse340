const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

exports.buildVehicleList = async (req, res, next) => {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render("inventory/list", { title: "All Vehicles", vehicles });
  } catch (err) {
    next(err);
  }
};

exports.buildVehicleDetail = async (req, res, next) => {
  try {
    const inv_id = parseInt(req.params.inv_id);
    const vehicle = await inventoryModel.getVehicleById(inv_id);
    if (!vehicle) {
      return res.status(404).render("errors/404", { title: "Vehicle Not Found" });
    }
    const vehicleHTML = utilities.buildVehicleDetailHTML(vehicle);
    res.render("inventory/detail", { title: `${vehicle.make} ${vehicle.model}`, vehicleHTML });
  } catch (err) {
    next(err);
  }
};