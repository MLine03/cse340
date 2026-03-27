// routes/classificationRoutes.js
import express from 'express';
import { getClassifications } from '../models/vehicleModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const classifications = await getClassifications();
    res.render('classification/index', { classifications });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;