const invModel = require("../models/inventory-model")

const Util = {}

/* ===============================
   BUILD NAVIGATION
=============================== */
Util.getNav = async function () {
  const data = await invModel.getClassifications()

  let list = "<ul>"
  list += '<li><a href="/">Home</a></li>'

  data.rows.forEach(row => {
    list += `<li><a href="/inv/type/${row.classification_id}">
              ${row.classification_name}
            </a></li>`
  })

  list += "</ul>"
  return list
}

/* ===============================
   BUILD CLASSIFICATION GRID
=============================== */
Util.buildClassificationGrid = async function (data) {
  let grid = '<ul id="inv-display">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
          <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
          <span>$${vehicle.inv_price}</span>
        </a>
      </li>
    `
  })

  grid += "</ul>"
  return grid
}

/* ===============================
   BUILD SINGLE VEHICLE PAGE
=============================== */
Util.buildSingleVehicleDisplay = async function (vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
      <p>${vehicle.inv_description}</p>
      <p><strong>Price:</strong> $${vehicle.inv_price}</p>
      <p><strong>Miles:</strong> ${vehicle.inv_miles}</p>
      <p><strong>Color:</strong> ${vehicle.inv_color}</p>
    </div>
  `
}

module.exports = Util