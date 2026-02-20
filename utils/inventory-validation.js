const { body, validationResult } = require("express-validator")

const invValidate = {}

invValidate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlphanumeric()
      .withMessage("No spaces or special characters allowed."),
  ]
}

invValidate.checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      errors: errors.array(),
    })
    return
  }
  next()
}

invValidate.inventoryRules = () => {
  return [
    body("inv_make").notEmpty(),
    body("inv_model").notEmpty(),
    body("inv_year").isInt(),
    body("inv_price").isFloat(),
    body("inv_miles").isInt(),
    body("classification_id").notEmpty(),
  ]
}

invValidate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const utilities = require(".")
    const classificationList =
      await utilities.buildClassificationList(req.body.classification_id)

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      classificationList,
      errors: errors.array(),
      ...req.body,
    })
    return
  }
  next()
}

module.exports = invValidate
