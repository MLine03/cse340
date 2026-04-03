const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = parseInt(req.params.classificationId)

  const data = await invModel.getInventoryByClassificationId(classification_id)

  // build vehicle grid
  const grid = await utilities.buildClassificationGrid(data.rows)

  // FIX: classification name comes from FIRST ROW
  const className = data.rows[0].classification_name

  const nav = await utilities.getNav()

  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 * Build vehicle detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)

  const data = await invModel.getInventoryByInventoryId(inv_id)
  const vehicle = data.rows[0]

  const detail = await utilities.buildVehicleDetail(vehicle)
  const nav = await utilities.getNav()

  res.render("inventory/detail", {
    title: vehicle.inv_make + " " + vehicle.inv_model,
    nav,
    detail,
  })
}

module.exports = invCont