// Build HTML for a vehicle detail view
export const buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image" />
      <div class="vehicle-info">
        <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Price:</strong> $${Number(vehicle.price).toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${Number(vehicle.mileage).toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    </div>
  `;
};