const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const { requireLogin } = require('../middleware/authMiddleware');

router.get('/manage', requireLogin, accountsController.manageAccount);
router.get('/update/:id', requireLogin, accountsController.getUpdateAccount);
router.post('/update', requireLogin, accountsController.postUpdateAccount);
router.post('/update-password', requireLogin, accountsController.postChangePassword);

module.exports = router;