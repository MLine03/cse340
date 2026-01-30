const express = require('express');
const router = express.Router();
const { classificationPage, vehicleDetail } = require('../controllers/inventory-controller');

// Classification view
router.get('/classification/:id', classificationPage);

// Vehicle detail view
router.get('/vehicle/:id', vehicleDetail);

// Footer intentional error
router.get('/cause-error', (req, res, next) => {
    next(new Error('Intentional 500 error'));
});

module.exports = router;
