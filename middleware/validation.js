exports.checkClassification = (req, res, next) => {
  const { classification_name } = req.body
  const regex = /^[A-Za-z0-9]+$/
  if (!classification_name || !regex.test(classification_name)) {
    return res.render("inventory/add-classification", { title: "Add Classification", errors: ["Classification name must be alphanumeric without spaces"] })
  }
  next()
}
