// utilities/buildVehicleDetail.js
function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" />
      </div>
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong> $${vehicle.inv_price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()}</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

module.exports = { buildVehicleDetail };
