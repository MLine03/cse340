const inventoryModel = require("../models/inventoryModel")
const util = require("../utilities/index")

async function showManagement(req, res) {
  const message = req.flash("message")
  res.render("inventory/management", { message })
}

async function addClassificationForm(req, res) {
  const message = req.flash("message")
  res.render("inventory/add-classification", { message, errors: null })
}

async function addClassification(req, res) {
  const { classification_name } = req.body

  // Server-side validation
  const errors = []
  if (!classification_name || !/^[a-zA-Z0-9]+$/.test(classification_name)) {
    errors.push("Classification name cannot contain spaces or special characters")
  }

  if (errors.length > 0) {
    return res.render("inventory/add-classification", { message: null, errors })
  }

  const result = await inventoryModel.addClassification({ classification_name })
  if (result) {
    req.flash("message", "Classification added successfully!")
    res.redirect("/inv")
  } else {
    res.render("inventory/add-classification", { message: null, errors: ["Failed to add classification"] })
  }
}

async function addInventoryForm(req, res) {
  const classificationList = await util.buildClassificationList()
  res.render("inventory/add-inventory", { message: null, errors: null, classificationList, formData: {} })
}

async function addInventory(req, res) {
  const invData = req.body
  const errors = []

  if (!invData.inv_make) errors.push("Make is required")
  if (!invData.inv_model) errors.push("Model is required")
  if (!invData.inv_year || isNaN(invData.inv_year)) errors.push("Year must be a number")
  if (!invData.classification_id) errors.push("Classification is required")

  if (errors.length > 0) {
    const classificationList = await util.buildClassificationList(invData.classification_id)
    return res.render("inventory/add-inventory", { message: null, errors, classificationList, formData: invData })
  }

  const result = await inventoryModel.addInventory(invData)
  if (result) {
    req.flash("message", "Inventory added successfully!")
    res.redirect("/inv")
  } else {
    const classificationList = await util.buildClassificationList(invData.classification_id)
    res.render("inventory/add-inventory", { message: null, errors: ["Failed to add inventory item"], classificationList, formData: invData })
  }
}

module.exports = { showManagement, addClassificationForm, addClassification, addInventoryForm, addInventory }
