exports.showInventory = (req, res) => {
  res.render("inventory", { title: "Inventory", message: "" })
}

exports.getInventoryDetail = (req, res) => {
  const id = req.params.id
  res.send(`Details for inventory item ${id}`)
}

exports.showAddClassification = (req, res) => {
  res.render("add-classification", { title: "Add Classification" })
}

exports.showAddInventory = (req, res) => {
  res.render("add-inventory", { title: "Add Inventory Item" })
}
