// Show inventory management page
exports.showInventory = (req, res) => {
  res.render("inventory/management", { title: "Inventory Management" })
}

// Inventory detail view
exports.getInventoryDetail = (req, res) => {
  const inventoryId = req.params.id
  // You can fetch from DB here. For now, send dummy data
  res.render("inventory/details", {
    title: "Inventory Detail",
    inventory: { id: inventoryId, name: "Example Vehicle" }
  })
}

// Show Add Classification page
exports.showAddClassification = (req, res) => {
  res.render("inventory/add-classification", { title: "Add Classification" })
}

// Show Add Inventory page
exports.showAddInventory = (req, res) => {
  res.render("inventory/add-inventory", { title: "Add Inventory" })
}

// Show Add Vehicle page (optional)
exports.showAddVehicle = (req, res) => {
  res.render("inventory/add-vehicle", { title: "Add Vehicle" })
}
