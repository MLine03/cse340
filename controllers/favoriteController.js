const favModel = require("../models/favorite-model");
const utilities = require("../utilities/");

// ADD FAVORITE
async function addFavorite(req, res) {
  const account_id = res.locals.accountData?.account_id;
  const { inv_id } = req.body;

  if (!account_id) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/account/login");
  }

  if (!inv_id || isNaN(inv_id)) {
    req.flash("error", "Invalid vehicle.");
    return res.redirect("/");
  }

  try {
    await favModel.addFavorite(account_id, inv_id);
    req.flash("success", "Added to favorites!");
    res.redirect(`/inv/detail/${inv_id}`);
  } catch (error) {
    console.error("Add favorite error:", error);
    req.flash("error", "Failed to add favorite.");
    res.redirect("/");
  }
}

// VIEW FAVORITES ⭐ FIXED
async function viewFavorites(req, res) {
  const account_id = res.locals.accountData?.account_id;

  if (!account_id) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/account/login");
  }

  try {
    const data = await favModel.getFavorites(account_id);
    const nav = await utilities.getNav(); // ⭐ ADD THIS

    res.render("favorites/index", {
      title: "My Favorites",
      nav, // ⭐ ADD THIS
      vehicles: data.rows || []
    });
  } catch (error) {
    console.error("View favorites error:", error);
    req.flash("error", "Could not load favorites.");
    res.redirect("/");
  }
}

// REMOVE FAVORITE
async function removeFavorite(req, res) {
  const account_id = res.locals.accountData?.account_id;
  const { inv_id } = req.body;

  if (!account_id) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/account/login");
  }

  try {
    await favModel.removeFavorite(account_id, inv_id);
    req.flash("success", "Removed from favorites.");
    res.redirect("/favorites");
  } catch (error) {
    console.error("Remove favorite error:", error);
    req.flash("error", "Failed to remove favorite.");
    res.redirect("/favorites");
  }
}

module.exports = {
  addFavorite,
  viewFavorites,
  removeFavorite
};