export const wrapVehicleDetail = (vehicle) => {
  const price = vehicle.price.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const mileage = vehicle.mileage.toLocaleString();

  return `
    <div class="vehicle-detail">
      <h1>${vehicle.make} ${vehicle.model}</h1>
      <img src="${vehicle.image_full}" alt="${vehicle.make} ${vehicle.model}" />
      <p>Year: ${vehicle.year}</p>
      <p>Price: ${price}</p>
      <p>Mileage: ${mileage}</p>
      <p>${vehicle.description}</p>
    </div>
  `;
};