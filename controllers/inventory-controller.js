const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByClassification(req, res) {
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

async function buildDetail(req, res) {
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
