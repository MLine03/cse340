const express = require('express');
const router = express.Router();
const invController = require('../controllers/inventory-controller');
const utilities = require('../utilities');

router.get(
  '/detail/:inv_id',
  utilities.handleErrors(invController.buildByInventoryId)
);

router.get(
  '/trigger-error',
  utilities.handleErrors(invController.triggerError)
);

module.exports = router;