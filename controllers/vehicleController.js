import { getClassifications, addClassification, addVehicle } from '../models/vehicleModel.js';

// Render index page with classifications
export async function showHome(req, res) {
  const classifications = await getClassifications();
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('index', { classifications, messages, old: {} });
}

// Handle add classification
export async function handleAddClassification(req, res) {
  const name = req.body.classification_name?.trim();
  if (!name) {
    req.session.messages = ['Classification name is required'];
    return res.redirect('/');
  }
  try {
    await addClassification(name);
    req.session.messages = ['Classification added successfully'];
  } catch (error) {
    req.session.messages = ['Error adding classification: ' + error.message];
  }
  res.redirect('/');
}

// Handle add vehicle
export async function handleAddVehicle(req, res) {
  const { make, model, year, price, description, classification } = req.body;
  const old = { make, model, year, price, description, classification };
  const errors = [];

  if (!make) errors.push('Make is required');
  if (!model) errors.push('Model is required');
  if (!year || isNaN(year)) errors.push('Valid year is required');
  if (!price || isNaN(price)) errors.push('Valid price is required');
  if (!description) errors.push('Description is required');
  if (!classification) errors.push('Classification is required');

  if (errors.length > 0) {
    req.session.messages = errors;
    return res.render('index', { classifications: await getClassifications(), messages: errors, old });
  }

  try {
    await addVehicle({
      make,
      model,
      year: parseInt(year),
      price: parseFloat(price),
      description,
      classificationId: parseInt(classification)
    });
    req.session.messages = ['Vehicle added successfully'];
    res.redirect('/');
  } catch (error) {
    req.session.messages = ['Error adding vehicle: ' + error.message];
    res.render('index', { classifications: await getClassifications(), messages: [error.message], old });
  }
}