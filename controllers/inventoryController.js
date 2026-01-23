const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

const buildVehicleDetail = async (req, res, next) => {
  const vehicleId = parseInt(req.params.id);
  try {
    const vehicle = await inventoryModel.getVehicleById(vehicleId);
    if (!vehicle) {
      return res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        message: "Vehicle not found.",
      });
    }
    const vehicleDetailHTML = utilities.buildVehicleDetail(vehicle);
    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      vehicleDetailHTML,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { buildVehicleDetail };
