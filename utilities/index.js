exports.buildVehicleHTML = (vehicle) => {
  const price = `$${vehicle.price.toLocaleString()}`;
  const miles = vehicle.miles.toLocaleString();

  return `
    <div class="vehicle-container">
      <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image"/>
      <div class="vehicle-info">
        <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
};