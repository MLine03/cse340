const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildByClassification(req, res, next) {
  try {
    const classificationId = req.params.classificationId
    const nav = await utilities.getNav()
    const inventory = await inventoryModel.getInventoryByClassification(classificationId)

    res.render("classification", { 
      title: "Classification", 
      nav, 
      inventory 
    })
  } catch (error) {
    next(error)
  }
}

async function buildVehicleDetail(req, res, next) {
  try {
    const invId = req.params.invId
    const nav = await utilities.getNav()
    const vehicle = await inventoryModel.getVehicleById(invId)

    const vehicleHTML = utilities.buildVehicleDetail(vehicle)

    res.render("vehicle-detail", { 
      title: `${vehicle.inv_make} ${vehicle.inv_model}`, 
      nav, 
      detailHtml: vehicleHTML   // ✅ FIXED
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { buildByClassification, buildVehicleDetail }