const utilities = require("../utilities")
exports.buildHome = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("index", {
    title: "Home",
    nav
  })
}