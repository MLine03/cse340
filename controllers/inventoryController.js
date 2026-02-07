const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* MANAGEMENT VIEW */
invCont.buildManagement = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  })
}

/* ADD CLASSIFICATION VIEW */
invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    sticky: {},
  })
}

/* ADD CLASSIFICATION PROCESS */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body

  // Server-side validation
  if (!classification_name || /[^a-zA-Z0-9]/.test(classification_name)) {
    const nav = await utilities.getNav()
    req.flash("notice", "Classification name required (no spaces/special chars).")
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: ["Invalid classification name."],
      sticky: { classification_name },
    })
  }

  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.flash("success", "Classification added successfully.")
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } else {
    const nav = await utilities.getNav()
    req.flash("notice", "Failed to add classification.")
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: ["Failed to add classification."],
      sticky: { classification_name },
    })
  }
}

/* ADD INVENTORY VIEW */
invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
    sticky: {},
  })
}

/* ADD INVENTORY PROCESS */
invCont.addInventory = async function (req, res) {
  const result = await invModel.addInventory(req.body)

  if (result) {
    req.flash("success", "Vehicle added successfully.")
    const nav = await utilities.getNav()
    res.render("inventory/management", {
      title: "Inventory Management",
      nav,
    })
  } else {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList(req.body.classification_id)
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: ["Failed to add vehicle."],
      sticky: req.body,
    })
  }
}

module.exports = invCont
