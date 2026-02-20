const db = require("../database/db");
const utils = require("../utilities/utils");

async function listVehicles(req, res, next) {
  try {
    const vehicles = await db.query("SELECT * FROM vehicles ORDER BY inv_id");
    res.render("inventory-list", { vehicles: vehicles.rows });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function vehicleDetail(req, res, next) {
  try {
    const { inv_id } = req.params;
    const vehicle = await db.query(
      "SELECT * FROM vehicles WHERE inv_id=$1",
      [inv_id]
    );

    if (!vehicle.rows.length) return res.status(404).send("Vehicle not found");

    const vehicleHTML = utils.buildVehicleDetailHTML(vehicle.rows[0]);
    res.render("inventory-detail", { vehicleHTML });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = { listVehicles, vehicleDetail };