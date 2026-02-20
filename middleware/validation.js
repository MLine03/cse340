const { body, validationResult } = require('express-validator');

exports.checkClassification = [
  body('classification_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Classification name is required')
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage('No spaces or special characters allowed'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      return res.render('inventory/add-classification', {
        title: 'Add Classification',
        errors: errors.array(),
        data: req.body
      });
    }
    next();
  }
];

exports.checkVehicle = [
  body('inv_make').notEmpty().withMessage('Make is required'),
  body('inv_model').notEmpty().withMessage('Model is required'),
  body('inv_year').isInt({ min: 1900, max: 2099 }).withMessage('Year must be valid'),
  body('classification_id').notEmpty().withMessage('Classification is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.session.errors = errors.array();
      return res.render('inventory/add-vehicle', {
        title: 'Add Vehicle',
        errors: errors.array(),
        data: req.body,
        classificationList: require('../utilities').buildClassificationList(req.body.classification_id)
      });
    }
    next();
  }
];