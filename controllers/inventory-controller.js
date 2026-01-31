const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByClassification(req, res) {
  const typeId = req.params.typeId
  const vehicles = await inventoryModel.getVehiclesByClassification(typeId)
  res.render("inventory/classification", {
    title: "Classification",
    grid: vehicles.map(v => `<p>${v.inv_make} ${v.inv_model}</p>`).join(""),
  })
}

async function buildVehicleDetail(req, res) {
  const invId = req.params.invId
  const vehicle = await inventoryModel.getVehicleById(invId)
  if (!vehicle) {
    return res.status(404).render("errors/404", { title: "Vehicle Not Found" })
  }
  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    detailHTML: utilities.buildVehicleDetail(vehicle),
  })
}

module.exports = { buildByClassification, buildVehicleDetail }
