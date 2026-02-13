// controllers/inventoryController.js
const { inventoryModel } = require('../utilities');

// Get all inventory items
async function getInventory(req, res) {
  try {
    const items = await inventoryModel.getAllItems();  // create this function in inventory.js
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
}

// Add new inventory item
async function addInventory(req, res) {
  try {
    const { item_name, quantity, price } = req.body;

    // Basic server-side validation
    if (!item_name || quantity == null || price == null) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newItem = await inventoryModel.createItem({ item_name, quantity, price });
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
}

module.exports = {
  getInventory,
  addInventory
};
