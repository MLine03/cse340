import accountModel from "../models/accountModel.js"
import bcrypt from "bcryptjs"

const accountController = {}

accountController.buildAccount = async (req, res) => {
  res.render("account/account", {
    title: "Account Management",
    account_firstname: "User",
    account_type: "Admin"
  })
}

accountController.buildUpdate = async (req, res) => {
  const account = await accountModel.getAccountById(req.params.account_id)

  res.render("account/update", {
    title: "Update Account",
    account
  })
}

accountController.updateAccount = async (req, res) => {
  const result = await accountModel.updateAccount(req.body)

  if (result) {
    res.render("account/account", { message: "Update successful" })
  } else {
    res.render("account/update", { message: "Update failed" })
  }
}

accountController.updatePassword = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const result = await accountModel.updatePassword(req.body.account_id, hash)

  if (result) {
    res.render("account/account", { message: "Password updated" })
  } else {
    res.render("account/update", { message: "Password failed" })
  }
}

accountController.logout = (req, res) => {
  res.clearCookie("jwt")
  res.redirect("/")
}

export default accountController