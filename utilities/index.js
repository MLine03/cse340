export const buildVehicleDetailHTML = (vehicle) => {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" />
      <div class="vehicle-info">
        <h1>${vehicle.make} ${vehicle.model} (${vehicle.year})</h1>
        <p>Price: $${Number(vehicle.price).toLocaleString()}</p>
        <p>Mileage: ${Number(vehicle.mileage).toLocaleString()} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
};