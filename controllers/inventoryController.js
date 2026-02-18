let classifications = []
let inventoryItems = []

exports.showInventory = (req, res) => {
  res.render("inventory", { title: "Inventory", message: "", classifications, inventoryItems })
}

exports.showAddClassification = (req, res) => {
  res.render("add-classification", { title: "Add Classification" })
}

exports.showAddInventory = (req, res) => {
  res.render("add-inventory", { title: "Add Inventory", classifications })
}

// POST handlers
exports.addClassification = (req, res) => {
  const { classification } = req.body
  if (classification) {
    classifications.push(classification)
    req.flash("message", `Classification "${classification}" added!`)
  }
  res.redirect("/inv")
}

exports.addInventory = (req, res) => {
  const { name, price, classification } = req.body
  if (name && price && classification) {
    inventoryItems.push({ name, price, classification })
    req.flash("message", `Inventory item "${name}" added!`)
  }
  res.redirect("/inv")
}
