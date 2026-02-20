const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { checkLogin } = require('../middleware/authMiddleware');

router.get('/manage', checkLogin, accountController.manageAccount);
router.get('/update/:id', checkLogin, accountController.updateAccountView);
router.post('/update', checkLogin, accountController.updateAccountInfo);
router.post('/update-password', checkLogin, accountController.updatePassword);

module.exports = router;