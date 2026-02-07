const invModel = require("../models/inventory-model")

Util = {}

Util.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications()
  let list = `<select name="classification_id" required>`
  list += `<option value="">Choose a Classification</option>`
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

module.exports = Util
