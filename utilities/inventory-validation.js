const { body, validationResult } = require("express-validator")

const validate = {}

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlphanumeric()
      .withMessage("No spaces or special characters allowed."),
  ]
}

validate.checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await require("./index").getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
    })
    return
  }
  next()
}

validate.inventoryRules = () => {
  return [
    body("inv_make").notEmpty(),
    body("inv_model").notEmpty(),
    body("inv_year").isInt(),
    body("inv_price").isFloat(),
    body("inv_miles").isInt(),
    body("classification_id").notEmpty(),
  ]
}

validate.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await require("./index").getNav()
    const classificationList =
      await require("./index").buildClassificationList(
        req.body.classification_id
      )

    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors,
      ...req.body, // STICKY FORM
    })
    return
  }
  next()
}

module.exports = validate
