const { body, validationResult } = require("express-validator")

/* *****************************
 * Login validation rules
 * ***************************** */
function loginRules() {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password is required."),
  ]
}

/* *****************************
 * Check login data
 * ***************************** */
async function checkLoginData(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await require("./index").getNav()
    return res.render("account/login", {
      title: "Login",
      nav,
      errors: errors.array(),
      account_email: req.body.account_email,
    })
  }
  next()
}

module.exports = {
  loginRules,
  checkLoginData,
}
