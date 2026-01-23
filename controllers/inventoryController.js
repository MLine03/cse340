const utilities = require("../utilities")
const inventoryModel = require("../models/inventory-model")

/* Vehicle detail controller */
async function buildVehicleDetail(req, res, next) {
  try {
    const vehicleId = parseInt(req.params.id)
    const vehicle = inventoryModel.getVehicleById(vehicleId)

    if (!vehicle) {
      res.status(404).render("errors/error", {
        title: "Vehicle Not Found",
        nav: "",
        message: "Vehicle not found."
      })
      return
    }

    const vehicleDetailHTML = utilities.buildVehicleDetail(vehicle)
    res.render("inventory/detail", {
      title: `${vehicle.inv_make} ${vehicle.inv_model}`,
      nav: "",
      vehicleDetailHTML
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { buildVehicleDetail }

