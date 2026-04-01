import { getInventoryByClassification, getInventoryById } from '../models/inventory-model.js';
import { buildVehicleDetailHTML } from '../utils/index.js';

export const getClassification = async (req, res, next) => {
  try {
    const classificationId = req.params.classificationId;
    const inventory = await getInventoryByClassification(classificationId);
    res.render('inventory/classification', { inventory });
  } catch (err) {
    next(err);
  }
};

export const getVehicleDetail = async (req, res, next) => {
  try {
    const inventoryId = req.params.inventoryId;
    const vehicle = await getInventoryById(inventoryId);
    if (!vehicle) {
      res.status(404).render('error', { message: 'Vehicle not found', status: 404 });
      return;
    }
    const vehicleHTML = buildVehicleDetailHTML(vehicle);
    res.render('inventory/detail', { vehicleHTML, vehicle });
  } catch (err) {
    next(err);
  }
};