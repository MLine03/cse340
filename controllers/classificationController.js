import classificationModel from "../models/classification-model.js"; // exact file name

export async function addClassification(req, res, next) {
  const { classification_name } = req.body;
  try {
    const result = await classificationModel.addClassification(classification_name);
    if (result) {
      req.flash("message", "Classification added successfully!");
      res.redirect("/inv/");
    } else {
      res.render("inventory/add-classification", {
        errors: [{ msg: "Failed to add classification" }],
        message: null,
      });
    }
  } catch (error) {
    next(error);
  }
}