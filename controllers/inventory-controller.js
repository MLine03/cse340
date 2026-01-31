const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByClassification(req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassification(classification_id)
  const grid = await utilities.buildClassificationGrid(data)

  res.render("inventory/classification", {
    title: "Vehicle Classification",
    grid,
  })
}

async function buildVehicleDetail(req, res, next) {
  const inv_id = req.params.invId
  const vehicle = await invModel.getVehicleById(inv_id)
  const detailHTML = utilities.buildVehicleDetail(vehicle)

  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    detailHTML,
  })
}

module.exports = {
  buildByClassification,
  buildVehicleDetail,
}
