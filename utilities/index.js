async function getNav() {
  return `
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/inv/class/1">SUV</a></li>
        <li><a href="/inv/class/2">Sedan</a></li>
      </ul>
    </nav>
  `
}

function buildVehicleDetail(vehicle) {
  return `
    <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" style="max-width:400px">
    <p>Year: ${vehicle.inv_year}</p>
    <p>Price: $${vehicle.inv_price.toLocaleString()}</p>
    <p>Mileage: ${vehicle.inv_miles.toLocaleString()} miles</p>
    <p>${vehicle.inv_description}</p>
  `
}

module.exports = { getNav, buildVehicleDetail }