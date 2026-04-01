// utilities/index.js
import { getClassifications } from "../models/inventory-model.js";

export async function buildClassificationList(selectedId = null) {
  const data = await getClassifications();
  let list = '<select name="classification_id" id="classificationList" required>';
  list += "<option value=''>Choose a Classification</option>";
  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}" ${row.classification_id == selectedId ? "selected" : ""}>${row.classification_name}</option>`;
  });
  list += "</select>";
  return list;
}