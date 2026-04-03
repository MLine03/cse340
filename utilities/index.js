export function buildVehicleHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" />
      <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
      <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
      <p><strong>Mileage:</strong> ${vehicle.miles.toLocaleString()} miles</p>
      <p>${vehicle.description}</p>
    </div>
  `;
}