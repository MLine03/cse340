const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

// Detail Controller
async function getInventoryDetail(req, res, next) {
  try {
    const inv_id = req.params.inv_id
    const vehicle = await inventoryModel.getInventoryById(inv_id)

    if (!vehicle) {
      const err = new Error("Vehicle not found")
      err.status = 404
      throw err
    }

    const detailHTML = await utilities.buildVehicleDetail(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      detailHTML,
    })
  } catch (error) {
    next(error)
  }
}

// Intentional 500 error
async function triggerError(req, res, next) {
  throw new Error("Intentional 500 error")
}

module.exports = {
  getInventoryDetail,
  triggerError,
}