const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* Classification view */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const nav = await utilities.getNav()

    if (!data || data.length === 0) {
      return res.status(404).render("errors/404", {
        title: "No Vehicles Found",
        message: "No vehicles found for this classification.",
        nav,
      })
    }

    const grid = await utilities.buildClassificationGrid(data)

    res.render("inventory/classification", {
      title: data[0].classification_name + " vehicles",
      nav,
      grid,
      message: null,
    })
  } catch (error) {
    next(error)
  }
}

/* Detail view */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = req.params.id
    const vehicle = await invModel.getInventoryById(invId)
    const nav = await utilities.getNav()

    if (!vehicle) {
      return res.status(404).render("errors/404", {
        title: "Vehicle Not Found",
        message: "Sorry, this vehicle does not exist.",
        nav,
      })
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)

    res.render("inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      htmlData,
      message: null,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont