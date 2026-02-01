const inventoryModel = require("./models/inventory-model")

function handleErrors(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

// Build navigation dynamically
async function getNav() {
  const classifications = await inventoryModel.getClassifications()
  return classifications
    .map(
      (c) => `<li><a href="/inventory/type/${c.classification_id}">${c.classification_name}</a></li>`
    )
    .join("")
}

// Build vehicle detail HTML
function buildVehicleDetail(vehicle) {
  return `
    <p>Make: ${vehicle.inv_make}</p>
    <p>Model: ${vehicle.inv_model}</p>
    <p>Year: ${vehicle.inv_year}</p>
    <p>Price: $${vehicle.inv_price}</p>
  `
}

module.exports = { handleErrors, getNav, buildVehicleDetail }
