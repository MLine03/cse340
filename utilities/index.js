// Build HTML string for a vehicle detail view
exports.buildVehicleDetailHTML = (vehicle) => {
  return `
    <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" style="max-width:100%">
    <p>Year: ${vehicle.inv_year}</p>
    <p>Price: $${vehicle.inv_price.toLocaleString()}</p>
    <p>Mileage: ${vehicle.inv_miles.toLocaleString()} miles</p>
    <p>${vehicle.inv_description}</p>
  `
}
