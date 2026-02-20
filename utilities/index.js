function buildVehicleDetailHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" />
      </div>
      <div class="vehicle-info">
        <h2>${vehicle.make} ${vehicle.model} (${vehicle.year})</h2>
        <p><strong>Price:</strong> $${Number(vehicle.price).toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${Number(vehicle.miles).toLocaleString()} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
}

module.exports = { buildVehicleDetailHTML };