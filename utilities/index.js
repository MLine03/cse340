const invModel = require('../models/inventoryModel');

const Util = {};

// Build Classification Select List
Util.buildClassificationList = async function (classification_id = null) {
  const data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += '<option value="">Choose a Classification</option>';
  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}"${classification_id == row.classification_id ? ' selected' : ''}>${row.classification_name}</option>`;
  });
  list += '</select>';
  return list;
};

// Build Vehicle Detail View
Util.buildVehicleDetail = function(vehicle) {
  return `
    <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <p>Price: $${Number(vehicle.inv_price).toLocaleString()}</p>
    <p>Mileage: ${Number(vehicle.inv_miles).toLocaleString()} miles</p>
    <p>Color: ${vehicle.inv_color}</p>
    <p>Description: ${vehicle.inv_description}</p>
  `;
};

module.exports = Util;