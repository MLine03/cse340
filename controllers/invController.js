const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// ⭐ Controller object MUST exist before using it
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try {
    const classification_id = parseInt(req.params.classificationId)

    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    const nav = await utilities.getNav()

    res.render("./inventory/classification", {
      title: data[0].classification_name + " vehicles",
      nav,
      grid,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = invCont