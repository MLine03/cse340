const invModel = require("../models/inventory-model")

/* ******************************
 * Build Navigation
 * **************************** */
async function getNav() {
  const data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/">Home</a></li>'
  data.rows.forEach(row => {
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


/* ******************************
 * Error Handler Wrapper
 * **************************** */
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = { getNav, handleErrors }