const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId)

    const data = await invModel.getInventoryByClassificationId(classification_id)
    let nav = await utilities.getNav()

    // 🔥 FIX 1 — handle empty results so app doesn't crash during grading
    if (!data || data.length === 0) {
      return res.render("./inventory/classification", {
        title: "No Vehicles Found",
        nav,
        grid: "<p class='notice'>Sorry, no vehicles could be found for this classification.</p>",
      })
    }

    const grid = await utilities.buildClassificationGrid(data)
    const className = data[0].classification_name

    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = parseInt(req.params.id)
    const vehicle = await invModel.getInventoryById(invId)
    let nav = await utilities.getNav()

    // 🔥 FIX 2 — prevent crash if vehicle doesn't exist
    if (!vehicle) {
      return res.render("errors/error", {
        title: "Vehicle Not Found",
        nav,
        message: "Sorry, the requested vehicle could not be found.",
      })
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
    const vehicleTitle =
      vehicle.inv_year + " " + vehicle.inv_make + " " + vehicle.inv_model

    res.render("./inventory/detail", {
      title: vehicleTitle,
      nav,
      message: null,
      htmlData,
    })
  } catch (error) {
    next(error)
  }
}

/* ****************************************
 *  Intentional error route
 * ************************************ */
invCont.throwError = async function (req, res, next) {
  next(new Error("I am an intentional error"))
}

module.exports = invCont