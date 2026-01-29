const inventoryModel = require("../models/inventory-model");

module.exports.getNav = async function () {
  // Example navigation HTML
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/inv/">Inventory Management</a></li>
    </ul>
  `;
};

// Build classification select list
module.exports.buildClassificationList = async function (classification_id = null) {
  const data = await inventoryModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required>';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += `<option value="${row.classification_id}"`;
    if (classification_id != null && row.classification_id == classification_id) {
      classificationList += " selected";
    }
    classificationList += `>${row.classification_name}</option>`;
  });
  classificationList += "</select>";
  return classificationList;
};
