const pool = require("../database/")

const Util = {}

/* ******************************
 * Build Navigation Dynamically
 * ***************************** */
Util.getNav = async function () {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")
  let nav = "<ul>"
  nav += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach(row => {
    nav += '<li>'
    nav += '<a href="/inv/type/' + row.classification_id + '"'
    nav += ' title="See our inventory of ' + row.classification_name + ' vehicles">'
    nav += row.classification_name
    nav += '</a></li>'
  })

  nav += "</ul>"
  return nav
}

/* **************************************
 * Build Classification Grid
 * ************************************* */
Util.buildClassificationGrid = async function (data) {
  if (!data || data.length === 0) {
    return '<p class="notice">Sorry, no matching vehicles found.</p>'
  }

  let grid = '<ul id="inv-display">'

  data.forEach(vehicle => {
    grid += '<li>'
    grid += '<a href="/inv/detail/' + vehicle.inv_id + '">'
    grid += '<img src="' + vehicle.inv_image + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + '">'
    grid += '</a>'
    grid += '<div class="namePrice">'
    grid += '<hr />'
    grid += '<h2>'
    grid += '<a href="/inv/detail/' + vehicle.inv_id + '">'
    grid += vehicle.inv_make + ' ' + vehicle.inv_model
    grid += '</a>'
    grid += '</h2>'
    grid += '<span>$' + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
    grid += '</div>'
    grid += '</li>'
  })

  grid += '</ul>'
  return grid
}

/* **************************************
 * Build Single Vehicle Display
 * ************************************* */
Util.buildSingleVehicleDisplay = async function (vehicle) {
  if (!vehicle) return "<p>Vehicle not found</p>"

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
      <p><strong>Mileage:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      <p>${vehicle.inv_description}</p>
    </div>
  `
}

module.exports = Util