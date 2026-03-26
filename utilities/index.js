const inventoryModel = require('../models/inventoryModel');

// Build Classification Dropdown
exports.buildClassificationList = async function (classification_id = null) {
    const data = await inventoryModel.getClassifications();
    let classificationList = '<select name="classification_id" id="classificationList" required>';
    classificationList += "<option value=''>Choose a Classification</option>";
    data.rows.forEach(row => {
        classificationList += `<option value="${row.classification_id}"`;
        if (classification_id != null && row.classification_id == classification_id) {
            classificationList += ' selected';
        }
        classificationList += `>${row.classification_name}</option>`;
    });
    classificationList += '</select>';
    return classificationList;
};

// Build Vehicle Detail HTML
exports.buildVehicleDetailHTML = (vehicle) => {
    return `
        <div class="vehicle-detail">
            <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" />
            <div class="vehicle-info">
                <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
                <p>Year: ${vehicle.inv_year}</p>
                <p>Price: $${Number(vehicle.inv_price).toLocaleString()}</p>
                <p>Mileage: ${Number(vehicle.inv_miles).toLocaleString()} miles</p>
                <p>Color: ${vehicle.inv_color}</p>
                <p>Description: ${vehicle.inv_description}</p>
            </div>
        </div>
    `;
};