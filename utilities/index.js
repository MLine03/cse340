export const buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" />
      <div class="vehicle-info">
        <h1>${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.miles.toLocaleString()} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
};