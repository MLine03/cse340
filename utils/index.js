// utils/index.js

/**
 * Build HTML for a single vehicle detail
 * @param {object} vehicle - The vehicle object from the database
 * @returns {string} - HTML string to render in the view
 */
export function buildVehicleDetailHTML(vehicle) {
  return `
    <div class="vehicle-detail">
      <img src="/images/${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-image"/>
      <div class="vehicle-info">
        <h1>${vehicle.inv_make} ${vehicle.inv_model}</h1>
        <p><strong>Year:</strong> ${vehicle.inv_year}</p>
        <p><strong>Price:</strong> $${vehicle.inv_price.toLocaleString()}</p>
        <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()} miles</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </div>
  `;
}