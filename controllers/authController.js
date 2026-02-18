exports.showLogin = (req, res) => {
  res.render("login", { title: "Login", message: "" })
}

exports.login = (req, res) => {
  // simple example: always log in
  req.session.loggedIn = true
  req.flash("message", "You are logged in")
  res.redirect("/")
}

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
}
