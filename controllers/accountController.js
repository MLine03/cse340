const utilities = require("../utilities")

const accountController = {}

accountController.buildLogin = async (req, res, next) => {
  try {
    const nav = await utilities.getNav()
    res.render("account/login", { title: "Login", nav, message: null })
  } catch (error) {
    next(error)
  }
}

accountController.handleLogin = async (req, res, next) => {
  try {
    // TODO: validate login
    res.redirect("/")
  } catch (error) {
    next(error)
  }
}

module.exports = accountController