function buildVehicleDetailHTML(vehicle) {
  const priceFormatted = vehicle.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const milesFormatted = vehicle.miles.toLocaleString();

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image"/>
      <div class="vehicle-info">
        <h1>${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> ${priceFormatted}</p>
        <p><strong>Mileage:</strong> ${milesFormatted} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    </div>
  `;
}

module.exports = {
  buildVehicleDetailHTML
};