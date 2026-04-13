const express = require("express");
const router = new express.Router();
const favController = require("../controllers/favoriteController");
const utilities = require("../utilities");

// VIEW FAVORITES
router.get("/", utilities.checkLogin, favController.viewFavorites);

// ADD FAVORITE
router.post("/add", utilities.checkLogin, favController.addFavorite);

// REMOVE FAVORITE
router.post("/remove", utilities.checkLogin, favController.removeFavorite);

module.exports = router;