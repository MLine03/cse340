const pool = require("../database/")

const utilities = {}

/* ***************************
 * Build Navigation
 * ************************** */
utilities.getNav = async function () {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach(row => {
    list += `<li>
      <a href="/inv/type/${row.classification_id}" 
      title="See our inventory of ${row.classification_name} vehicles">
      ${row.classification_name}</a>
    </li>`
  })
  list += "</ul>"
  return list
}


/* ***************************
 * Build Classification Grid
 * ************************** */
utilities.buildClassificationGrid = async function(data) {
  let grid
  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += `<li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model}">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <hr>
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
        </div>
      </li>`
    })
    grid += "</ul>"
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* ***************************
 * Build Vehicle Detail View
 * ************************** */
utilities.buildVehicleDetail = async function(vehicle) {
  let detail = `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p class="price">$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Miles:</strong> ${new Intl.NumberFormat('en-US').format(vehicle.inv_miles)}</p>
      </div>
    </div>
  `
  return detail
}


/* ***************************
 * Async Error Wrapper
 * ************************** */
utilities.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)


module.exports = utilities