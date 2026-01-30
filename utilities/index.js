function buildVehicleHTML(vehicle) {
    return `
    <div class="vehicle-detail">
        <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-img">
        <div class="vehicle-info">
            <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
            <p><strong>Price:</strong> $${Number(vehicle.price).toLocaleString()}</p>
            <p><strong>Mileage:</strong> ${Number(vehicle.mileage).toLocaleString()} miles</p>
            <p>${vehicle.description}</p>
        </div>
    </div>
    `;
}

module.exports = { buildVehicleHTML };
