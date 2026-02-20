const invModel = require('../models/inventory-model');

const Util = {};

Util.buildClassificationList = async function (selectedId = null) {
  const data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"${selectedId == row.classification_id ? ' selected' : ''}>${row.classification_name}</option>`;
  });
  list += '</select>';
  return list;
};

module.exports = Util;