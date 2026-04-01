export function buildVehicleHTML(vehicle) {
  return `
    <h1>${vehicle.make} ${vehicle.model}</h1>
    <div class="vehicle-detail">
      <img src="${vehicle.img_full}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img"/>
      <div class="vehicle-info">
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.description}</p>
      </div>
    </div>
  `;
}