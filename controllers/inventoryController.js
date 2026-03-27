// inventoryController.js
import { getClassifications, addVehicle, getVehicleById } from '../models/inventory-model.js';

// Show add vehicle form
export async function showAddVehicleForm(req, res) {
  const classifications = await getClassifications();
  res.render('add-vehicle', { classifications });
}

// Handle adding vehicle
export async function handleAddVehicle(req, res) {
  try {
    const vehicle = req.body;
    await addVehicle(vehicle);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding vehicle");
  }
}

// Show vehicle details
export async function showVehicleDetail(req, res) {
  const vehicle = await getVehicleById(req.params.id);
  if (!vehicle) {
    return res.status(404).send("Vehicle not found");
  }
  res.render('vehicle-detail', { vehicle });
}