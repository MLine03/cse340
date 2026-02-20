const pool = require('../db')

// Build classification select list
exports.buildClassificationList = async function (classification_id = null) {
  const data = await pool.query('SELECT * FROM classification ORDER BY classification_name')
  let classificationList = '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach(row => {
    classificationList += `<option value="${row.classification_id}"${classification_id == row.classification_id ? ' selected' : ''}>${row.classification_name}</option>`
  })
  classificationList += '</select>'
  return classificationList
}