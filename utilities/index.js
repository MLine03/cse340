const inventoryModel = require("../models/inventoryModel")

async function buildClassificationList(selectedId = null) {
  const classifications = await inventoryModel.getClassifications()
  let list = '<select name="classification_id" id="classificationList" required>'
  list += '<option value="">Choose a Classification</option>'
  classifications.forEach((c) => {
    list += `<option value="${c.classification_id}" ${selectedId == c.classification_id ? "selected" : ""}>${c.classification_name}</option>`
  })
  list += "</select>"
  return list
}

module.exports = { buildClassificationList }
