// Wrap async route handlers in error catcher
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// Build HTML string for vehicle detail page
function buildVehicleDetail(vehicle) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price)

  const mileage = new Intl.NumberFormat("en-US").format(vehicle.inv_miles)

  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" 
             alt="Image of ${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}">
      </div>
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>
  `
}

module.exports = { handleErrors, buildVehicleDetail }