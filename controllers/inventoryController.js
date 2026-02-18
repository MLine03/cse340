// controllers/inventoryController.js

// Fake in-memory data for demo
let inventory = [
  { id: 1, name: "Delorean DMC-12", type: "Car", price: "$50,000" },
  { id: 2, name: "Tesla Model S", type: "Car", price: "$80,000" },
];

exports.listInventory = (req, res) => {
  res.render("inventory/management", { title: "Inventory Management", inventory });
};

exports.getInventoryDetail = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const vehicle = inventory.find((v) => v.id === id);
  if (!vehicle) {
    req.flash("error", "Vehicle not found");
    return res.redirect("/inventory");
  }
  res.render("inventory/detail", { title: vehicle.name, vehicle });
};

exports.showAddInventory = (req, res) => {
  res.render("inventory/add-inventory", { title: "Add Vehicle" });
};

exports.showAddClassification = (req, res) => {
  res.render("inventory/add-classification", { title: "Add Classification" });
};
