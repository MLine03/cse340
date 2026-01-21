const invModel = require("../models/inventory-model")
const utilities = require("../utilities/index")

const invCont = {}

invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)

  let nav = await utilities.getNav()
  let grid
  let title

  if (!data || data.length === 0) {
    title = "No Vehicles Found"
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  } else {
    title = data[0].classification_name + " Vehicles"
    grid = await utilities.buildClassificationGrid(data)
  }

  res.render("inventory/classification", { title, nav, grid })
}

module.exports = invCont

