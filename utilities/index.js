const pool = require("../database/")

const utilities = {}

/* ***************************
 * Navigation builder
 * ************************** */
utilities.getNav = async function () {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name")
  let list = '<ul class="nav">'
  list += '<li><a href="/" title="Home page">Home</a></li>'

  data.rows.forEach((row) => {
    list += `<li>
      <a href="/inv/type/${row.classification_id}" 
         title="See our inventory of ${row.classification_name} vehicles">
         ${row.classification_name}
      </a>
    </li>`
  })

  list += "</ul>"
  return list
}

/* ***************************
 * Build classification grid
 * ************************** */
utilities.buildClassificationGrid = async function (data) {
  let grid

  if (data.length > 0) {
    grid = '<ul id="inv-display">'

    data.forEach((vehicle) => {
      grid += `
        <li>
          <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
          </a>
          <div class="namePrice">
            <hr>
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
  } else {
    grid = "<p class='notice'>Sorry, no matching vehicles could be found.</p>"
  }

  return grid
}

module.exports = utilities