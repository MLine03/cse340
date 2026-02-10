const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")
const { body, validationResult } = require("express-validator")

async function buildManagement(req, res, next) {
  try {
    res.render("inventory/management", { title: "Inventory Management" })
  } catch (err) {
    next(err)
  }
}

async function buildAddClassification(req, res, next) {
  try {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      errors: null,
      classification_name: "",
    })
  } catch (err) {
    next(err)
  }
}

const addClassification = [
  body("classification_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Classification name is required")
    .isAlphanumeric()
    .withMessage("No spaces or special characters allowed"),
  async (req, res, next) => {
    const errors = validationResult(req)
    const { classification_name } = req.body
    if (!errors.isEmpty()) {
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        errors: errors.array(),
        classification_name,
      })
    }
    try {
      const result = await inventoryModel.addClassification(classification_name)
      if (result.rowCount > 0) {
        req.flash("success", `Classification "${classification_name}" added successfully`)
        return res.redirect("/inv")
      } else {
        req.flash("error", "Failed to add classification")
        return res.redirect("/inv/add-classification")
      }
    } catch (err) {
      next(err)
    }
  },
]

async function buildAddInventory(req, res, next) {
  try {
    const classificationList = await utilities.buildClassificationList()
    res.render("inventory/add-inventory", {
      title: "Add Vehicle",
      errors: null,
      classificationList,
      inv_make: "",
      inv_model: "",
      inv_year: "",
      inv_price: "",
      inv_miles: "",
      inv_color: "",
      inv_description: "",
      inv_image: "/images/no-image.png",
      inv_thumbnail: "/images/no-image.png",
    })
  } catch (err) {
    next(err)
  }
}

const addInventory = [
  body("classification_id").notEmpty().withMessage("Please select a classification"),
  body("inv_make").trim().notEmpty().withMessage("Make is required"),
  body("inv_model").trim().notEmpty().withMessage("Model is required"),
  body("inv_year").trim().isInt({ min: 1900 }).withMessage("Enter a valid year"),
  body("inv_price").trim().isFloat({ min: 0 }).withMessage("Enter a valid price"),
  body("inv_miles").trim().isInt({ min: 0 }).withMessage("Enter valid miles"),
  body("inv_color").trim().notEmpty().withMessage("Color is required"),
  async (req, res, next) => {
    const errors = validationResult(req)
    const classificationList = await utilities.buildClassificationList(req.body.classification_id)
    const {
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_price,
      inv_miles,
      inv_color,
      inv_description,
      inv_image,
      inv_thumbnail,
    } = req.body

    if (!errors.isEmpty()) {
      return res.render("inventory/add-inventory", {
        title: "Add Vehicle",
        errors: errors.array(),
        classificationList,
        inv_make,
        inv_model,
        inv_year,
        inv_price,
        inv_miles,
        inv_color,
        inv_description,
        inv_image: inv_image || "/images/no-image.png",
        inv_thumbnail: inv_thumbnail || "/images/no-image.png",
      })
    }

    try {
      const result = await inventoryModel.addInventory(
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_price,
        inv_miles,
        inv_color,
        inv_description,
        inv_image || "/images/no-image.png",
        inv_thumbnail || "/images/no-image.png"
      )

      if (result.rowCount > 0) {
        req.flash("success", `Vehicle "${inv_make} ${inv_model}" added successfully`)
        return res.redirect("/inv")
      } else {
        req.flash("error", "Failed to add vehicle")
        return res.redirect("/inv/add-inventory")
      }
    } catch (err) {
      next(err)
    }
  },
]

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
}
