function handleErrors(fn) {
  return (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)
}

function buildClassificationGrid(data) {
  let grid = '<ul class="inv-grid">'
  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inventory/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make}">
          <h3>${vehicle.inv_make} ${vehicle.inv_model}</h3>
        </a>
      </li>`
  })
  grid += "</ul>"
  return grid
}

function buildVehicleDetail(vehicle) {
  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> $${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</p>
        <p><strong>Mileage:</strong> ${new Intl.NumberFormat("en-US").format(vehicle.inv_miles)} miles</p>
        <p>${vehicle.inv_description}</p>
      </div>
    </section>
  `
}

module.exports = {
  handleErrors,
  buildClassificationGrid,
  buildVehicleDetail,
}
