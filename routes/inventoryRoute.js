const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { body } = require("express-validator");

// Management page
router.get("/", inventoryController.buildManagementView);

// Add Classification Routes
router.get("/add-classification", inventoryController.buildAddClassification);
router.post(
  "/add-classification",
  body("classification_name")
    .trim()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Classification name must not contain spaces or special characters"),
  inventoryController.addClassification
);

// Add Inventory Routes
router.get("/add-inventory", inventoryController.buildAddInventory);
router.post(
  "/add-inventory",
  [
    body("classification_id").notEmpty().withMessage("Classification is required"),
    body("inv_make").trim().notEmpty().withMessage("Make is required"),
    body("inv_model").trim().notEmpty().withMessage("Model is required"),
    body("inv_year").isInt({ min: 1900 }).withMessage("Valid year is required"),
    body("inv_price").isFloat({ min: 0 }).withMessage("Price must be valid"),
    body("inv_miles").isFloat({ min: 0 }).withMessage("Miles must be valid"),
    body("inv_color").trim().notEmpty().withMessage("Color is required"),
    body("inv_description").trim().notEmpty().withMessage("Description is required"),
  ],
  inventoryController.addInventory
);

module.exports = router;
