const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { body } = require("express-validator");

// Management view
router.get("/", inventoryController.buildManagement);

// Add classification
router.get("/add-classification", inventoryController.buildAddClassification);
router.post(
  "/add-classification",
  body("classification_name").trim().isAlphanumeric().withMessage("Classification must not contain spaces or special characters."),
  inventoryController.addClassification
);

// Add inventory
router.get("/add-inventory", inventoryController.buildAddInventory);
router.post(
  "/add-inventory",
  body("inv_make").trim().notEmpty().withMessage("Make is required."),
  body("inv_model").trim().notEmpty().withMessage("Model is required."),
  body("inv_year").isInt({ min: 1900, max: 2100 }).withMessage("Year is invalid."),
  body("inv_description").trim().notEmpty().withMessage("Description is required."),
  body("inv_price").isFloat({ min: 0 }).withMessage("Price must be a positive number."),
  body("inv_miles").isFloat({ min: 0 }).withMessage("Miles must be a positive number."),
  body("inv_color").trim().notEmpty().withMessage("Color is required."),
  inventoryController.addInventory
);

module.exports = router;
