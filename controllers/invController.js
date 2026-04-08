const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)

    if (!data || data.length === 0) {
      return next({ status: 404, message: "No vehicles found." })
    }

    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()
    const className = data[0].classification_name

    res.render("inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = req.params.id
    const vehicle = await invModel.getInventoryById(invId)

    if (!vehicle) {
      return next({ status: 404, message: "Vehicle not found." })
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
    const nav = await utilities.getNav()
    const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`

    res.render("inventory/detail", {
      title: vehicleTitle,
      nav,
      htmlData,
    })
  } catch (error) {
    next(error)
  }
}

invCont.throwError = async function (req, res, next) {
  throw new Error("I made this error on purpose")
}

module.exports = invCont