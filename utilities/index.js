const buildVehicleDetail = async function (data) {
  const price = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(data.inv_price)

  const mileage = new Intl.NumberFormat("en-US").format(data.inv_miles)

  return `
    <div class="vehicle-detail">
      <div class="vehicle-image">
        <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
      </div>
      <div class="vehicle-info">
        <h2>${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Mileage:</strong> ${mileage} miles</p>
        <p><strong>Description:</strong> ${data.inv_description}</p>
        <p><strong>Color:</strong> ${data.inv_color}</p>
      </div>
    </div>
  `
}

module.exports = {
  buildVehicleDetail,
}