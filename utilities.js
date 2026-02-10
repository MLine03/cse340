const inventoryModel = require("./models/inventory-model")

// Build classification dropdown
async function buildClassificationList(selectedId = null) {
  const data = await inventoryModel.getClassifications()
  let list = '<select name="classification_id" id="classificationList" required>'
  list += '<option value="">Choose a Classification</option>'
  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"${
      selectedId == row.classification_id ? " selected" : ""
    }>${row.classification_name}</option>`
  })
  list += "</select>"
  return list
}

// Build nav
function getNav() {
  return `<a href="/">Home</a> <a href="/inv">Inventory</a> <a href="/account/login">My Account</a>`
}

// Error handler wrapper
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

module.exports = {
  getNav,
  buildClassificationList,
  handleErrors,
}
