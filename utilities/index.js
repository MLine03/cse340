const invModel = require("../models/inventory-model")

/* ****************************************
 * Async Error Wrapper Middleware
 **************************************** */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

/* ****************************************
 * Build Navigation Dynamically
 **************************************** */
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

module.exports = {
  getNav,
  handleErrors
}