const pool = require('../db')
const util = require('../utilities') // fixed path

// Management view
exports.buildManagementView = (req, res, next) => {
  const message = req.session.message
  delete req.session.message
  res.render('inventory/management', { message })
}

// Add classification view
exports.buildAddClassificationView = (req, res, next) => {
  const message = req.session.message
  delete req.session.message
  res.render('inventory/add-classification', { message })
}

// Add vehicle view
exports.buildAddVehicleView = async (req, res, next) => {
  try {
    const classificationList = await util.buildClassificationList()
    const message = req.session.message
    delete req.session.message
    res.render('inventory/add-vehicle', { classificationList, message })
  } catch (err) {
    next(err)
  }
}

// Process new classification
exports.addClassification = async (req, res, next) => {
  const { classification_name } = req.body
  if (!classification_name.match(/^[a-zA-Z0-9]+$/)) {
    req.session.message = 'Classification cannot contain spaces or special characters'
    return res.redirect('/inv/add-classification')
  }

  try {
    const result = await pool.query(
      'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *',
      [classification_name]
    )
    req.session.message = `Successfully added classification: ${result.rows[0].classification_name}`
    res.redirect('/inv/')
  } catch (err) {
    next(err)
  }
}

// Process new vehicle
exports.addVehicle = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color
  } = req.body

  // Server-side validation
  if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_price || !inv_miles) {
    req.session.message = 'Please fill out all required fields'
    return res.redirect('/inv/add-vehicle')
  }

  try {
    const result = await pool.query(
      `INSERT INTO inventory 
      (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color]
    )
    req.session.message = `Successfully added vehicle: ${result.rows[0].inv_make} ${result.rows[0].inv_model}`
    res.redirect('/inv/')
  } catch (err) {
    next(err)
  }
}