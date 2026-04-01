export const buildVehicleDetailHTML = (vehicle) => {
  const price = vehicle.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const mileage = vehicle.miles.toLocaleString();

  return `
    <div class="vehicle-detail">
      <h2>${vehicle.make} ${vehicle.model} (${vehicle.year})</h2>
      <img src="${vehicle.inv_image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
      <p><strong>Price:</strong> ${price}</p>
      <p><strong>Mileage:</strong> ${mileage} miles</p>
      <p><strong>Description:</strong> ${vehicle.description}</p>
    </div>
  `;
};