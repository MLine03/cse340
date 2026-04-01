import { getVehicleById } from '../models/inventoryModel.js';
import { buildVehicleHTML } from '../utilities/index.js';

export async function getInventoryDetail(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id);
    if (isNaN(inv_id)) return res.status(400).send('Invalid ID');

    const vehicle = await getVehicleById(inv_id);
    if (!vehicle)
      return res.status(404).render('error', { error: { message: 'Vehicle not found', status: 404 } });

    const vehicleHTML = buildVehicleHTML(vehicle);
    res.render('inventory/detail', { vehicleHTML, vehicle });
  } catch (err) {
    next(err);
  }
}