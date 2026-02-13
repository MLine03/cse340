const accountModel = require('../models/account');
const inventoryModel = require('../models/inventory');
const reviewModel = require('../models/review');

module.exports = {
    showAccounts: async (req, res) => {
        try {
            const accounts = await accountModel.getAllAccounts();
            res.render('accounts', { accounts });
        } catch (err) {
            res.status(500).send('Error fetching accounts');
        }
    },
    showInventory: async (req, res) => {
        try {
            const items = await inventoryModel.getAllItems();
            res.render('inventory', { items });
        } catch (err) {
            res.status(500).send('Error fetching inventory');
        }
    },
    showReviews: async (req, res) => {
        try {
            const reviews = await reviewModel.getAllReviews();
            res.render('reviews', { reviews });
        } catch (err) {
            res.status(500).send('Error fetching reviews');
        }
    },
    addReview: async (req, res) => {
        try {
            const { account_id, item_id, rating, comment } = req.body;

            // Server-side validation
            if (!account_id || !item_id || !rating || rating < 1 || rating > 5) {
                return res.status(400).send('Invalid input');
            }

            const review = await reviewModel.addReview({ account_id, item_id, rating, comment });
            res.redirect('/reviews');
        } catch (err) {
            res.status(500).send('Error adding review');
        }
    }
};
