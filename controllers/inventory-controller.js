const invModel = require('../models/inventory-model');
const util = require('../utils/index');

exports.managementView = (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render('inventory/inventory-management', { message });
};

exports.addClassificationView = (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render('inventory/add-classification', { message, sticky: '' });
};

exports.addClassification = async (req, res) => {
  const { classification_name } = req.body;
  const cleanName = classification_name?.trim();

  if (!cleanName || /[^a-zA-Z0-9]/.test(cleanName)) {
    return res.render('inventory/add-classification', {
      message: 'Invalid classification name. No spaces or special chars allowed.',
      sticky: cleanName
    });
  }

  const result = await invModel.addClassification(cleanName);

  if (result.success) {
    req.session.message = `Classification "${cleanName}" added successfully!`;
    res.redirect('/inv');
  } else {
    res.render('inventory/add-classification', {
      message: 'Error adding classification.',
      sticky: cleanName
    });
  }
};

exports.addVehicleView = async (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  const classificationList = await util.buildClassificationList();
  res.render('inventory/add-vehicle', { message, sticky: {}, classificationList });
};

exports.addVehicle = async (req, res) => {
  const { classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color } = req.body;
  const sticky = { classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color };

  // Server-side validation
  if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_price || !inv_miles || !inv_color) {
    const classificationList = await util.buildClassificationList(classification_id);
    return res.render('inventory/add-vehicle', {
      message: 'All fields are required.',
      sticky,
      classificationList
    });
  }

  const result = await invModel.addVehicle({ classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color });

  if (result.success) {
    req.session.message = `Vehicle "${inv_make} ${inv_model}" added successfully!`;
    res.redirect('/inv');
  } else {
    const classificationList = await util.buildClassificationList(classification_id);
    res.render('inventory/add-vehicle', { message: 'Error adding vehicle.', sticky, classificationList });
  }
};