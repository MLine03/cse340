const utilities = require("../utilities")

async function buildHome(req, res, next) {
  try {
    const nav = await utilities.getNav()
    res.render("home", { title: "Home", nav })
  } catch (error) {
    next(error)
  }
}

module.exports = { buildHome }