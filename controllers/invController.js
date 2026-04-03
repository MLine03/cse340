const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 * Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = parseInt(req.params.classificationId)

  const data = await invModel.getInventoryByClassificationId(classification_id)
  const nav = await utilities.getNav()

  res.render("inventory/classification", {
    title: data.rows[0].classification_name + " vehicles",
    nav,
    data: data.rows
  })
}


/* ***************************
 * Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = parseInt(req.params.invId)

  const data = await invModel.getInventoryById(inv_id)
  const nav = await utilities.getNav()

  res.render("inventory/detail", {
    title: data.rows[0].inv_make + " " + data.rows[0].inv_model,
    nav,
    vehicle: data.rows[0]
  })
}

module.exports = invCont