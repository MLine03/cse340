// utilities/index.js
function buildVehicleDetailHTML(vehicle) {
  return `
    <h1>${vehicle.make} ${vehicle.model}</h1>
    <div class="vehicle-detail-container">
      <div class="vehicle-image">
        <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" />
      </div>
      <div class="vehicle-info">
        <p><strong>Make:</strong> ${vehicle.make}</p>
        <p><strong>Model:</strong> ${vehicle.model}</p>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    </div>
  `;
}

module.exports = { buildVehicleDetailHTML };