// utilities/index.js
const pool = require("../database")
const Util = {}

/* **************************************
 * Build the navigation menu
 * ************************************ */
Util.getNav = async function () {
  try {
    const classifications = await pool.query("SELECT * FROM public.classification")
    let nav = "<ul>"
    classifications.rows.forEach(c => {
      nav += `<li><a href="/inv/type/${c.classification_id}" title="View our ${c.classification_name} vehicles">${c.classification_name}</a></li>`
    })
    nav += "</ul>"
    return nav
  } catch (error) {
    console.error("getNav error:", error)
    return "<ul></ul>"
  }
}

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid = ""

  if (data.length > 0) {
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => {
      grid += '<li>'
      grid += `<a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">`
      grid += `<img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />`
      grid += "</a>"
      grid += '<div class="namePrice">'
      grid += "<hr />"
      grid += `<h2><a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">${vehicle.inv_make} ${vehicle.inv_model}</a></h2>`
      grid += `<span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>`
      grid += "</div></li>"
    })
    grid += "</ul>"
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }

  return grid
}

module.exports = Util
