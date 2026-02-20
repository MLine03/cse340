exports.buildVehicleDetailHTML = (vehicle) => {
  const priceFormatted = vehicle.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const mileageFormatted = vehicle.miles.toLocaleString();

  return `
    <div class="vehicle-detail">
      <img src="/images/${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img">
      <div class="vehicle-info">
        <h1>${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
        <p><strong>Price:</strong> ${priceFormatted}</p>
        <p><strong>Mileage:</strong> ${mileageFormatted} miles</p>
        <p>${vehicle.description}</p>
      </div>
    </div>
  `;
};