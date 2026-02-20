function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

// Format price as US dollars
function formatPrice(amount) {
  return `$${Number(amount).toLocaleString()}`
}

// Format mileage with commas
function formatMileage(miles) {
  return Number(miles).toLocaleString()
}

// Build HTML for vehicle detail
function buildVehicleDetailHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="full-size-image">
      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong> ${formatPrice(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${formatMileage(vehicle.inv_miles)}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>
  `
}

module.exports = { handleErrors, formatPrice, formatMileage, buildVehicleDetailHTML }