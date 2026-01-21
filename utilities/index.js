const Util = {}

Util.getNav = async function() {
  const classifications = await require("../models/inventory-model").getClassifications()
  let nav = "<ul>"
  classifications.forEach(c => {
    nav += `<li><a href="/inv/type/${c.classification_id}" title="View ${c.classification_name} vehicles">${c.classification_name}</a></li>`
  })
  nav += "</ul>"
  return nav
}

Util.buildClassificationGrid = async function(data) {
  let grid = '<ul id="inv-display">'
  data.forEach(vehicle => {
    grid += `<li>
      <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
        <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      </a>
      <div class="namePrice">
        <h2>
          <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h2>
        <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
      </div>
    </li>`
  })
  grid += "</ul>"
  return grid
}

module.exports = Util
