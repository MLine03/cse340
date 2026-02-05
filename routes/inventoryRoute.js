const express = require("express");
const router = express.Router();
const utilities = require("../utilities");
const invController = require("../controllers/inventoryController");

// Example route using handleErrors
router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteConfirm));

// Another example
router.post("/update/:inv_id", utilities.handleErrors(invController.updateInventory));

module.exports = router;
