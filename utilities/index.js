// utilities/index.js
function buildVehicleDetailHtml(vehicle) {
    // Format price and mileage
    const price = vehicle.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const mileage = vehicle.miles.toLocaleString();

    return `
        <div class="vehicle-detail-container">
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
            </div>
            <div class="vehicle-info">
                <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
                <p><strong>Price:</strong> ${price}</p>
                <p><strong>Mileage:</strong> ${mileage} miles</p>
                <p><strong>Description:</strong> ${vehicle.description}</p>
                <p><strong>Color:</strong> ${vehicle.color}</p>
                <p><strong>Stock Number:</strong> ${vehicle.inv_id}</p>
            </div>
        </div>
    `;
}

module.exports = {
    buildVehicleDetailHtml,
};
