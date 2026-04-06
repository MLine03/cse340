const invModel = require("../models/inventory-model")

const Util = {}

/* **********************
 * Build Navigation
 * ******************** */
Util.getNav = async function () {
  const data = await invModel.getClassifications()
  let list = '<ul class="nav">'
  list += '<li><a href="/" title="Home">Home</a></li>'

  data.rows.forEach((row) => {
    list += '<li>'
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })

  list += "</ul>"
  return list
}

/* **********************
 * Build classification grid
 * ******************** */
Util.buildClassificationGrid = async function (data) {
  let grid = '<ul id="inv-display">'

  data.forEach((vehicle) => {
    grid += "<li>"
    grid +=
      '<a href="/inv/detail/' +
      vehicle.inv_id +
      '" title="View ' +
      vehicle.inv_make +
      " " +
      vehicle.inv_model +
      ' details">'
    grid +=
      '<img src="' +
      vehicle.inv_thumbnail +
      '" alt="Image of ' +
      vehicle.inv_make +
      " " +
      vehicle.inv_model +
      ' on CSE Motors" />'
    grid += "</a>"
    grid += '<div class="namePrice">'
    grid += "<hr />"
    grid += "<h2>"
    grid +=
      '<a href="/inv/detail/' +
      vehicle.inv_id +
      '" title="View ' +
      vehicle.inv_make +
      " " +
      vehicle.inv_model +
      ' details">'
    grid += vehicle.inv_make + " " + vehicle.inv_model
    grid += "</a>"
    grid += "</h2>"
    grid += "<span>$" + new Intl.NumberFormat("en-US").format(vehicle.inv_price) + "</span>"
    grid += "</div>"
    grid += "</li>"
  })

  grid += "</ul>"
  return grid
}

/* **********************
 * Build single vehicle view
 * ******************** */
Util.buildSingleVehicleDisplay = async function (vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p>Price: $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
      <p>Miles: ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)}</p>
      <p>${vehicle.inv_description}</p>
    </div>
  `
}

module.exports = Util