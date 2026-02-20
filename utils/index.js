const invModel = require('../models/inventoryModel');

exports.buildClassificationList = async (selectedId = null) => {
  const data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += '<option value="">Choose a Classification</option>';
  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}"${row.classification_id == selectedId ? ' selected' : ''}>${row.classification_name}</option>`;
  });
  list += '</select>';
  return list;
};