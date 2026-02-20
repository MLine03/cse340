function buildVehicleDetail(vehicle) {
  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" />
      </div>
      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Price:</strong> ${formatCurrency(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${formatMileage(vehicle.inv_miles)}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}

function formatCurrency(amount) {
  return `$${Number(amount).toLocaleString()}`;
}

function formatMileage(miles) {
  return Number(miles).toLocaleString();
}

// Error handling wrapper
function handleErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { buildVehicleDetail, formatCurrency, formatMileage, handleErrors };