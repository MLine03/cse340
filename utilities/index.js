/* ******************************************
* Utilities Index
*******************************************/

/* ******************************************
* Wrap async route controllers to catch errors
*******************************************/
const handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* ******************************************
* Build Navigation
*******************************************/
const getNav = async () => {
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/inv/type/1">Cars</a></li>
      <li><a href="/inv/type/2">Trucks</a></li>
      <li><a href="/inv/type/3">SUV</a></li>
    </ul>
  `
}

/* ******************************************
* Build Classification Grid (vehicle list)
*******************************************/
const buildClassificationGrid = (data) => {
  let grid = '<ul class="vehicle-grid">'

  data.forEach(vehicle => {
    grid += `
      <li>
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
          <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
        </a>
      </li>
    `
  })

  grid += "</ul>"
  return grid
}

/* ******************************************
* Build Vehicle Detail HTML (Assignment requirement)
*******************************************/
const buildVehicleDetail = (vehicle) => {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price)

  const miles = new Intl.NumberFormat("en-US").format(vehicle.inv_miles)

  return `
    <div class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}">
      
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${miles} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
      </div>
    </div>
  `
}

module.exports = {
  handleErrors,
  getNav,
  buildClassificationGrid,
  buildVehicleDetail,
}