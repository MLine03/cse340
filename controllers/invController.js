const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ***************************
* Build inventory by classification view
**************************** */
async function buildByClassificationId(req, res, next) {
  const classification_id = req.params.classificationId
  const nav = await utilities.getNav()

  res.render("inventory/classification", {
    title: "Classification",
    nav
  })
}

/* ***************************
* Build vehicle detail view
**************************** */
async function buildByInvId(req, res, next) {
  const inv_id = req.params.invId
  const nav = await utilities.getNav()

  const vehicle = await invModel.getVehicleById(inv_id)

  const vehicleHTML = utilities.buildVehicleDetail(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleHTML
  })
}

module.exports = {
  buildByClassificationId,
  buildByInvId
}