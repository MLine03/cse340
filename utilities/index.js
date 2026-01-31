async function getNav() {
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/inventory/type/1">Cars</a></li>
      <li><a href="/inventory/type/2">Trucks</a></li>
      <li><a href="/account">Account</a></li>
    </ul>
  `
}

function handleErrors(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

function buildVehicleDetail(vehicle) {
  return `
    <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <p>Price: $${Number(vehicle.inv_price).toLocaleString()}</p>
    <p>Mileage: ${Number(vehicle.inv_miles).toLocaleString()}</p>
    <p>Description: ${vehicle.inv_description}</p>
  `
}

module.exports = { getNav, handleErrors, buildVehicleDetail }
