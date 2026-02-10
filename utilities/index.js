const invModel = require("../models/inventory-model")

Util = {}

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let list =
    '<select name="classification_id" id="classificationList" required>'
  list += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"`
    if (classification_id == row.classification_id) {
      list += " selected"
    }
    list += `>${row.classification_name}</option>`
  })
  list += "</select>"
  return list
}

Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util
