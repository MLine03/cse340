const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildVehicleDetailView(req, res, next) {
  const inv_id = req.params.inv_id
  const vehicle = await invModel.getVehicleById(inv_id)

  if (!vehicle) {
    const nav = await utilities.getNav()
    return res.status(404).render("errors/error", {
      title: "Vehicle Not Found",
      nav,
      message: "Sorry, that vehicle does not exist.",
    })
  }

  const nav = await utilities.getNav()
  const vehicleHTML = utilities.buildVehicleDetail(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleHTML,
  })
}

module.exports = {
  buildVehicleDetailView,
}
