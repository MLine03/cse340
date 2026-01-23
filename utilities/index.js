const invModel = require("../models/inventory-model")

const Util = {}

/* **************************************
 * Build navigation bar
 * ************************************** */
Util.getNav = async function () {
  let nav = "<ul><li><a href='/'>Home</a></li>"

  const classifications = await invModel.getClassifications()

  classifications.forEach(c => {
    nav += `<li>
      <a href="/inv/type/${c.classification_id}">${c.classification_name}</a>
    </li>`
  })

  nav += "</ul>"
  return nav
}

/* **************************************
 * Error handling middleware
 * ************************************** */
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* **************************************
 * Build vehicle detail HTML
 * ************************************** */
Util.buildVehicleDetail = function (vehicle) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price)

  const mileage = new Intl.NumberFormat("en-US").format(vehicle.inv_miles)

  return `
  <section class="vehicle-detail">
    <div class="vehicle-image">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
    </div>

    <div class="vehicle-info">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Mileage:</strong> ${mileage} miles</p>
      <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
    </div>
  </section>
  `
}

module.exports = Util
