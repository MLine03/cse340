// routes/inventory-routes.js
const express = require('express');
const router = express.Router();

// Import controller functions
const {
    classificationPage,
    vehicleDetail
} = require('../controllers/inventory-controller');

// -------------------------------
// Classification View Route
// Example URL: /inventory/classification/1
router.get('/classification/:id', classificationPage);

// -------------------------------
// Vehicle Detail View Route
// Example URL: /inventory/vehicle/10
router.get('/vehicle/:id', vehicleDetail);

// -------------------------------
// Footer intentional error route
// Example URL: /inventory/cause-error
router.get('/cause-error', (req, res, next) => {
    // This will trigger the 500 error handler in app.js
    next(new Error('Intentional 500 error'));
});

module.exports = router;
