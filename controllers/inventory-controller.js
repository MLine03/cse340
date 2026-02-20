const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

// Build vehicle detail page
async function buildByInventoryId(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id)

    if (isNaN(inv_id)) {
      const error = new Error("Invalid vehicle ID")
      error.status = 400
      throw error
    }

    const nav = await utilities.getNav()
    const vehicle = await invModel.getInventoryById(inv_id)

    if (!vehicle) {
      const error = new Error("Vehicle not found")
      error.status = 404
      throw error
    }

    const vehicleDetail = utilities.buildVehicleDetail(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      vehicleDetail,
    })
  } catch (error) {
    next(error)
  }
}

// Footer-triggered 500 error
async function triggerError(req, res, next) {
  throw new Error("Intentional server error")
}

module.exports = { buildByInventoryId, triggerError }