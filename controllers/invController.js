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

invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  console.log("classification_id:", classification_id) // <-- here
  const data = await invModel.getInventoryByClassificationId(classification_id)
  console.log("data from DB:", data) // <-- here

  if (!data || data.length === 0) {
    let nav = await utilities.getNav()
    return res.render("inventory/classification", {
      title: "No Vehicles Found",
      nav,
      grid: '<p class="notice">Sorry, no matching vehicles could be found.</p>',
    })
  }

  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}
