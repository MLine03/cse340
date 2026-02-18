exports.index = (req, res) => {
  res.render("inventory", { title: "Inventory", message: "" })
}

exports.showAddClassification = (req, res) => {
  res.send("Add Classification page")
}

exports.showAddInventory = (req, res) => {
  res.send("Add Inventory page")
}
