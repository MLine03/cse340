import AccountModel from "../models/accountModel.js";

export const getAccount = async (req, res) => {
  try {
    const account = await AccountModel.getAccount(req.session.userId);
    res.render("account/account-management", { account });
  } catch (err) {
    res.status(500).render("error", { message: err.message, status: 500 });
  }
};

export const updateAccount = async (req, res) => {
  try {
    await AccountModel.updateAccount(req.body);
    res.redirect("/account");
  } catch (err) {
    res.status(500).render("error", { message: err.message, status: 500 });
  }
};