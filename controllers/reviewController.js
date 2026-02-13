const reviewModel = require("../models/review-model")

// Add review controller
async function addReview(req, res) {
  const { review_text, review_rating, inv_id } = req.body
  const account_id = res.locals.accountData ? res.locals.accountData.account_id : null

  // Server-side validation
  if (!account_id) {
    req.flash("notice", "You must be logged in to add a review.")
    return res.redirect(`/inventory/detail/${inv_id}`)
  }

  if (!review_text || review_text.length < 10) {
    req.flash("notice", "Review must be at least 10 characters.")
    return res.redirect(`/inventory/detail/${inv_id}`)
  }

  const ratingNum = parseInt(review_rating)
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    req.flash("notice", "Rating must be between 1 and 5.")
    return res.redirect(`/inventory/detail/${inv_id}`)
  }

  const newReview = await reviewModel.addReview(review_text, ratingNum, inv_id, account_id)
  if (newReview) {
    req.flash("notice", "Review added successfully!")
  } else {
    req.flash("notice", "Failed to add review.")
  }

  res.redirect(`/inventory/detail/${inv_id}`)
}

module.exports = { addReview }
