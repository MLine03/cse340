const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

// Display details for a single vehicle
exports.getInventoryDetail = async (req, res, next) => {
  try {
    const inventoryId = req.params.id
    const vehicle = await inventoryModel.getVehicleById(inventoryId)
    if (!vehicle) {
      return res.status(404).render("errors/404")
    }
    const html = utilities.buildVehicleDetailHTML(vehicle)
    res.render("inventory/detail", { vehicleHTML: html, vehicle })
  } catch (err) {
    next(err)
  }
}

// Show add classification page
exports.showAddClassification = (req, res) => {
  res.render("inventory/add-classification")
}

// Show add inventory page
exports.showAddInventory = (req, res) => {
  res.render("inventory/add-inventory")
}
