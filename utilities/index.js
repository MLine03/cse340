import invModel from "../models/inventoryModel.js"

const Util = {}

Util.buildClassificationList = async () => {
  const data = await invModel.getClassifications()
  let list = '<select name="classification_id">'

  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}">
      ${row.classification_name}
    </option>`
  })

  list += "</select>"
  return list
}

Util.buildDetailView = (data) => {
  return `
    <h2>${data.inv_make} ${data.inv_model}</h2>
    <p>$${data.inv_price}</p>
    <p>${data.inv_description}</p>
  `
}

export default Util