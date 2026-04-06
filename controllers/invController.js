const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  let nav = await utilities.getNav()

  // ⭐ REQUIRED FIX — prevent crash when no vehicles exist
  if (!data || data.length === 0) {
    return res.status(404).render("errors/error", {
      title: "No Vehicles Found",
      message: "Sorry, no vehicles exist in this classification yet.",
      nav
    })
  }

  const grid = await utilities.buildClassificationGrid(data)
  const className = data[0].classification_name

  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })

}

/* ***************************
 *Build vehicle detail view
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = req.params.id
    const vehicle = await invModel.getInventoryById(invId)
    let nav = await utilities.getNav()

    if (!vehicle) {
      return res.render("errors/error", {
        title: "Vehicle Not Found",
        message: "Sorry, the requested vehicle was not found.",
        nav
      })
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
    const vehicleTitle = `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`

    res.render("./inventory/detail", {
      title: vehicleTitle,
      nav,
      htmlData,
    })

  } catch (error) {
    next(error)
  }
}

/* Intentional error route */
invCont.throwError = async function (req, res) {
  throw new Error("I am an intentional error")
}

module.exports = invCont