const invModel = require("../models/inventory-model");

async function buildClassificationList(selectedId = null) {
  const data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += '<option value="">Choose a Classification</option>';
  data.forEach(row => {
    list += `<option value="${row.classification_id}"${row.classification_id == selectedId ? " selected" : ""}>${row.classification_name}</option>`;
  });
  list += '</select>';
  return list;
}

async function getNav() {
  const data = await invModel.getClassifications();
  let nav = '<ul>';
  data.forEach(row => {
    nav += `<li><a href="/inv/type/${row.classification_id}">${row.classification_name}</a></li>`;
  });
  nav += '</ul>';
  return nav;
}

function handleErrors(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  buildClassificationList,
  getNav,
  handleErrors,
};
