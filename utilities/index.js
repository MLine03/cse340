const invModel = require('../models/inventory-model');

module.exports = {
    buildVehicleDetailHTML: (vehicle) => {
        return `
        <div class="vehicle-detail">
            <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" style="max-width:100%;height:auto;">
            <div class="vehicle-info">
                <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
                <p>Year: ${vehicle.inv_year}</p>
                <p>Price: $${vehicle.inv_price.toLocaleString()}</p>
                <p>Mileage: ${vehicle.inv_miles.toLocaleString()}</p>
                <p>${vehicle.inv_description}</p>
            </div>
        </div>`;
    },

    buildClassificationList: async (selectedId = null) => {
        const data = await invModel.getClassifications();
        let options = '<select name="classification_id" id="classificationList" required>';
        options += '<option value="">Choose a Classification</option>';
        data.rows.forEach(row => {
            options += `<option value="${row.classification_id}" ${row.classification_id == selectedId ? "selected" : ""}>${row.classification_name}</option>`;
        });
        options += '</select>';
        return options;
    }
};