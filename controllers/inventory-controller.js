const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* *****************************
 *  Build inventory by classification view
 * ***************************** */
async function buildByClassification(req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  const nav = await utilities.getNav()

  res.render("inventory/classification", {
    title: data[0].classification_name,
    nav,
    grid,
  })
}

/* *****************************
 *  Build inventory detail view
 * ***************************** */
async function buildDetail(req, res, next) {
  const inv_id = req.params.invId
  const vehicle = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()
  const detailHTML = await utilities.buildVehicleDetail(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    detailHTML,
  })
}

module.exports = {
  buildByClassification,
  buildDetail,
}
