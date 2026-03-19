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
    <img src="${vehicle.inv_image}" alt="${vehicle.inv_make}" style="max-width:400px">
    <p><strong>Year:</strong> ${vehicle.inv_year}</p>
    <p><strong>Price:</strong> $${vehicle.inv_price.toLocaleString()}</p>
    <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()} miles</p>
    <p>${vehicle.inv_description}</p>
  `
}

module.exports = { getNav, buildVehicleDetail }