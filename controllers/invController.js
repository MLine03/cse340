const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

// Build vehicle detail page
async function buildVehicleDetail(req, res) {
  const inv_id = req.params.inv_id
  const vehicleData = await invModel.getVehicleById(inv_id)

  const nav = await utilities.getNav()
  const vehicleHTML = utilities.buildVehicleDetailHTML(vehicleData)

  res.render("inventory/detail", {
    title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
    nav,
    vehicleHTML
  })
}

// Intentional 500 error generator
async function triggerError(req, res) {
  throw new Error("Intentional Server Error")
}

module.exports = {
  buildVehicleDetail,
  triggerError
}