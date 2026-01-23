// Simulated inventory database
const vehicles = [
  {
    inv_id: 1,
    inv_make: "Toyota",
    inv_model: "Camry",
    inv_year: 2021,
    inv_price: 25000,
    inv_miles: 12000,
    inv_color: "Red",
    inv_description: "Reliable midsize sedan",
    inv_image: "/images/camry.jpg",
  },
  {
    inv_id: 2,
    inv_make: "Honda",
    inv_model: "Civic",
    inv_year: 2020,
    inv_price: 22000,
    inv_miles: 15000,
    inv_color: "Blue",
    inv_description: "Compact car with excellent fuel economy",
    inv_image: "/images/civic.jpg",
  },
];

const getAllVehicles = async () => {
  return vehicles;
};

const getVehicleById = async (id) => {
  return vehicles.find((v) => v.inv_id === id);
};

module.exports = { getAllVehicles, getVehicleById };
