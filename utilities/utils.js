function buildVehicleDetailHTML(vehicle) {
  return `
    <h2>${vehicle.make} ${vehicle.model} (${vehicle.year})</h2>
    <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" class="responsive-img"/>
    <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
    <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
    <p>${vehicle.description}</p>
  `;
}

module.exports = { buildVehicleDetailHTML };