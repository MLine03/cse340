exports.showLogin = (req, res) => {
  res.render("login", { title: "Login" })
}

exports.login = (req, res) => {
  // Dummy login
  const { username, password } = req.body
  if (username === "admin" && password === "1234") {
    req.session.loggedIn = true
    req.flash("message", "Successfully logged in!")
    res.redirect("/")
  } else {
    req.flash("message", "Invalid credentials")
    res.redirect("/auth/login")
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect("/")
}
