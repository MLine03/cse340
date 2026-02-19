const inventoryModel = require("../models/inventory-model");
const utilities = require("../utilities");

async function showInventory(req, res, next) {
  try {
    const vehicles = await inventoryModel.getAllVehicles();
    res.render("inventory/list", { title: "Inventory", vehicles });
  } catch (error) {
    next(error);
  }
}

async function showVehicleDetail(req, res, next) {
  try {
    const inv_id = req.params.id;
    const vehicle = await inventoryModel.getInventoryById(inv_id);

    if (!vehicle) {
      const err = new Error("Vehicle not found");
      err.status = 404;
      throw err;
    }

    const detailHTML = await utilities.buildVehicleDetail(vehicle);
    res.render("inventory/detail", { title: `${vehicle.inv_make} ${vehicle.inv_model}`, detailHTML });
  } catch (error) {
    next(error);
  }
}

// Intentional 500 error
function triggerError(req, res, next) {
  throw new Error("Intentional 500 error");
}

module.exports = {
  showInventory,
  showVehicleDetail,
  triggerError,
};