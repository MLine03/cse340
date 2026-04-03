export function buildVehicleHTML(vehicle) {
  const price = vehicle.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const mileage = vehicle.mileage.toLocaleString();

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
      <div class="vehicle-info">
        <h1>${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Year:</strong> ${vehicle.year}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage}</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
}