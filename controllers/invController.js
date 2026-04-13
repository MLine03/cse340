const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    let nav = await utilities.getNav()

    if (!data || data.length === 0) {
        return res.render("./inventory/classification", {
            title: "NO VEHICLES HAVE BEEN FOUND",
            nav,
            grid: "There has not been any vehicles created in this classification."
        })
    }

    const grid = await utilities.buildClassificationGrid(data)
    const className = data[0].classification_name

    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build vehicle detail view
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  try {
    const invId = req.params.id
    let vehicle = await invModel.getInventoryById(invId)

    // ✅ safety check
    if (!vehicle) {
      return next(new Error("Vehicle not found"))
    }

    const htmlData = await utilities.buildSingleVehicleDisplay(vehicle)
    let nav = await utilities.getNav()

    const vehicleTitle =
      vehicle.inv_year + " " + vehicle.inv_make + " " + vehicle.inv_model

    res.render("./inventory/detail", {
      title: vehicleTitle,
      nav,
      message: null,
      htmlData,
      inv_id: vehicle.inv_id
    })
  } catch (err) {
    next(err)
  }
}

/* ***************************
 *  Process intentional error
 * ************************** */
invCont.throwError = async function (req, res) {
    throw new Error("I am an intentional error")
}

/* ***************************
 *  Build vehicle management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()

    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        errors: null,
        classificationSelect,
    })
}

/* ***************************
 * Build new classification view
 * ************************** */
invCont.newClassificationView = async function (req, res, next) {
    let nav = await utilities.getNav()

    res.render("./inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    })
}

/* ***************************
 * Process new classification insert
 * ************************** */
invCont.addClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    try {
        const insertResult = await invModel.addClassification(classification_name)

        if (insertResult) {
            req.flash("message success",
                `The ${insertResult.classification_name} classification was successfully added.`)

            return res.status(201).render("inventory/management", {
                title: "Vehicle Management",
                nav,
                errors: null,
            })
        }

        req.flash("message warning", "Sorry, the insert failed.")
        return res.status(501).render("inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
        })

    } catch (err) {
        next(err)
    }
}

/* ***************************
 * Build new inventory view
 * ************************** */
invCont.newInventoryView = async function (req, res, next) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()

    res.render("./inventory/add-inventory", {
        title: "Add New Inventory",
        nav,
        classificationSelect,
        errors: null,
    })
}

/* ***************************
 * Process new inventory item insert
 * ************************** */
invCont.addInventory = async function (req, res, next) {
    let nav = await utilities.getNav()

    const {
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id,
    } = req.body

    try {
        const insertResult = await invModel.addInventory(
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            classification_id
        )

        if (insertResult) {
            const itemName = insertResult.inv_make + " " + insertResult.inv_model
            const classificationSelect = await utilities.buildClassificationList()

            req.flash("message success", `The ${itemName} was successfully added.`)

            return res.status(201).render("./inventory/management", {
                title: "Inventory Management",
                nav,
                errors: null,
                classificationSelect,
            })
        }

        req.flash("message warning", "Sorry, the insert failed.")
        return res.status(501).render("./inventory/add-inventory", {
            title: "Add New Inventory",
            nav,
            classificationSelect: await utilities.buildClassificationList(),
            errors: null,
        })

    } catch (err) {
        next(err)
    }
}

/* *************************************
 * Return Inventory by Classification As JSON
 * *********************************** */
invCont.getInventoryJSON = async (req, res, next) => {
    const classification_id = parseInt(req.params.classification_id)
    const invData = await invModel.getInventoryByClassificationId(classification_id)

    if (!invData || invData.length === 0) {
        return next(new Error("No data returned"))
    }

    return res.json(invData)
}

/* ***************************
 * Build edit item view
 * ************************** */
invCont.editInvItemView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const invData = await invModel.getInventoryById(inv_id)

    if (!invData) {
        return next(new Error("Item not found"))
    }

    const classificationSelect =
        await utilities.buildClassificationList(invData.classification_id)

    const itemName = `${invData.inv_make} ${invData.inv_model}`

    res.render("./inventory/edit-inventory", {
        title: "Edit " + itemName,
        nav,
        classificationSelect,
        errors: null,
        inv_id: invData.inv_id,
        inv_make: invData.inv_make,
        inv_model: invData.inv_model,
        inv_year: invData.inv_year,
        inv_description: invData.inv_description,
        inv_image: invData.inv_image,
        inv_thumbnail: invData.inv_thumbnail,
        inv_price: invData.inv_price,
        inv_miles: invData.inv_miles,
        inv_color: invData.inv_color,
        classification_id: invData.classification_id
    })
}

/* ***************************
 * Update Vehicle Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
    let nav = await utilities.getNav()

    const {
        inv_id,
        inv_make,
        inv_model,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_year,
        inv_miles,
        inv_color,
        classification_id
    } = req.body

    try {
        const updateResult = await invModel.updateInventory(
            inv_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
            classification_id
        )

        if (updateResult) {
            const itemName = updateResult.inv_make + " " + updateResult.inv_model
            req.flash("message success", itemName + " was successfully updated.")
            return res.redirect("/inv/")
        }

        req.flash("message warning", "Update failed.")
        return res.redirect("/inv/")

    } catch (err) {
        next(err)
    }
}

/* ***************************
 * Build delete confirmation view
 * ************************** */
invCont.deleteView = async function (req, res, next) {
    const inv_id = parseInt(req.params.inv_id)
    let nav = await utilities.getNav()
    const itemData = await invModel.getInventoryById(inv_id)

    if (!itemData) {
        return next(new Error("Item not found"))
    }

    const itemName = `${itemData.inv_make} ${itemData.inv_model}`

    res.render("./inventory/delete-confirm", {
        title: "Delete " + itemName,
        nav,
        errors: null,
        inv_id: itemData.inv_id,
        inv_make: itemData.inv_make,
        inv_model: itemData.inv_model,
        inv_year: itemData.inv_year,
        inv_price: itemData.inv_price,
    })
}

/* ***************************
 * Delete Inventory Item
 * ************************** */
invCont.deleteItem = async function (req, res, next) {
    let nav = await utilities.getNav()
    const inv_id = parseInt(req.body.inv_id)

    try {
        const deleteResult = await invModel.deleteInventoryItem(inv_id)

        if (deleteResult) {
            req.flash("message success", "The deletion was successful.")
            return res.redirect("/inv/")
        }

        req.flash("message warning", "Delete failed.")
        return res.redirect("/inv/")

    } catch (err) {
        next(err)
    }
}

module.exports = invCont