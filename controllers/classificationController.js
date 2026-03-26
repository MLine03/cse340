const classModel = require('../models/classification-model');

async function addClassification(req, res, next) {
  try {
    const name = req.body.classification_name;
    if (!name) {
      req.flash('message', 'Classification name is required');
      return res.redirect('/classification/add');
    }
    const newClass = await classModel.addClassification(name);
    req.flash('message', 'Classification added successfully!');
    res.redirect('/inventory/add');
  } catch (err) {
    next(err);
  }
}

module.exports = { addClassification };