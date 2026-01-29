const invModel = require("../models/inventory-model");

// Build classification select list
async function buildClassificationList(selectedId = null) {
  let data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"`;
    if (selectedId && row.classification_id == selectedId) {
      list += " selected";
    }
    list += `>${row.classification_name}</option>`;
  });
  list += "</select>";
  return list;
}

// Build navigation bar for classifications
async function getNav() {
  let data = await invModel.getClassifications();
  let nav = "<ul>";
  data.rows.forEach((row) => {
    nav += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`;
  });
  nav += "</ul>";
  return nav;
}

module.exports = {
  buildClassificationList,
  getNav,
};
