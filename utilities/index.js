const invModel = require("../models/inventory-model")

/* ***************************
 * Build navigation dynamically
 * ************************** */
async function getNav() {
  const data = await invModel.getClassifications()

  let nav = "<ul>"
  nav += '<li><a href="/">Home</a></li>'

  data.rows.forEach(row => {
    nav += `<li>
      <a href="/inv/type/${row.classification_id}">
        ${row.classification_name}
      </a>
    </li>`
  })

  nav += "</ul>"
  return nav
}

module.exports = { getNav }