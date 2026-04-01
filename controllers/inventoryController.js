import invModel from "../models/inventoryModel.js"
import Util from "../utilities/index.js"

const invController = {}

invController.managementView = (req, res) => {
  res.render("inventory/management", { title: "Inventory Management" })
}

invController.buildAddClassification = (req, res) => {
  res.render("inventory/add-classification", { title: "Add Classification" })
}

invController.addClassification = async (req, res) => {
  const result = await invModel.addClassification(req.body.classification_name)

  if (result) {
    res.render("inventory/management", { message: "Added successfully" })
  } else {
    res.render("inventory/add-classification", { message: "Failed" })
  }
}

invController.buildAddInventory = async (req, res) => {
  const list = await Util.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    classificationList: list
  })
}

invController.addInventory = async (req, res) => {
  const result = await invModel.addInventory(req.body)

  if (result) {
    res.render("inventory/management", { message: "Vehicle added" })
  } else {
    res.render("inventory/add-inventory", { message: "Failed" })
  }
}

invController.buildDetail = async (req, res) => {
  const data = await invModel.getVehicleById(req.params.inv_id)
  const html = Util.buildDetailView(data)
  res.render("inventory/detail", { title: "Detail", html })
}

export default invController