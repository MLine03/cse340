const express = require('express');
const router = express.Router();
const classificationController = require('../controllers/classificationController');

router.get('/add', (req, res) => res.render('classification/add', { messages: req.flash('message') }));
router.post('/add', classificationController.addClassification);

module.exports = router;