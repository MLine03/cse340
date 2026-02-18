// controllers/authController.js
exports.showLoginForm = (req, res) => {
  res.render("auth/login", { title: "Login" })
}

exports.processLogin = (req, res) => {
  // check credentials in database
  // if success, set session
  res.redirect("/")
}

exports.showRegisterForm = (req, res) => {
  res.render("auth/register", { title: "Register" })
}

exports.processRegister = (req, res) => {
  // create user in database
  res.redirect("/auth/login")
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/")
}
