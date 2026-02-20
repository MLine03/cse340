// routes/accounts.js
const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');
const { verifyJWT } = require('../middleware/authMiddleware');

router.get('/login', accountsController.loginPage);
router.post('/login', accountsController.loginProcess);

router.get('/', verifyJWT, accountsController.accountManagement);

router.get('/update/:id', verifyJWT, accountsController.updateAccountPage);
router.post('/update', verifyJWT, accountsController.updateAccount);
router.post('/password', verifyJWT, accountsController.updatePassword);

router.get('/logout', accountsController.logout);

module.exports = router;