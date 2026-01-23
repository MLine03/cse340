const inventory = [
  {
    inv_id: 1,
    inv_make: "Toyota",
    inv_model: "Camry",
    inv_year: 2021,
    inv_price: 25000,
    inv_miles: 15000,
    inv_color: "Blue",
    inv_description: "Reliable midsize sedan",
    inv_image: "/images/camry.jpg"
  },
  {
    inv_id: 2,
    inv_make: "Ford",
    inv_model: "Mustang",
    inv_year: 2020,
    inv_price: 35000,
    inv_miles: 12000,
    inv_color: "Red",
    inv_description: "Sporty coupe",
    inv_image: "/images/mustang.jpg"
  }
]

function getVehicleById(id) {
  return inventory.find(v => v.inv_id === id)
}

module.exports = { getVehicleById }
