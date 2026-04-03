// GLOBAL ERROR HANDLER WRAPPER
function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// BUILD VEHICLE DETAIL HTML
function buildVehicleDetailHTML(vehicle) {

  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(vehicle.inv_price)

  const miles = new Intl.NumberFormat("en-US")
    .format(vehicle.inv_miles)

  return `
    <section class="vehicle-detail">

      <div class="vehicle-image">
        <img src="${vehicle.inv_image}" 
             alt="${vehicle.inv_make} ${vehicle.inv_model}">
      </div>

      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>

        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>

        <p class="description">
          ${vehicle.inv_description}
        </p>
      </div>

    </section>
  `
}

module.exports = {
  handleErrors,
  buildVehicleDetailHTML
}