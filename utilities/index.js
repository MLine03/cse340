Util.buildClassificationGrid = async function(data) {
  let grid

  /* ⭐ REQUIRED RUBRIC FIX */
  if (!data || data.length === 0) {
    grid = '<p class="notice">Sorry, no matching vehicles found.</p>'
    return grid
  }

  grid = '<ul id="inv-display">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model}">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <div class="namePrice">
          <hr>
          <h2>
            <a href="/inv/detail/${vehicle.inv_id}">
              ${vehicle.inv_make} ${vehicle.inv_model}
            </a>
          </h2>
          <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
        </div>
      </li>
    `
  })

  grid += "</ul>"
  return grid
}