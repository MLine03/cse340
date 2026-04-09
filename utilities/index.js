const Util = {}

const jwt = require("jsonwebtoken")
require("dotenv").config()

// IMPORTANT: missing import in your file
const invModel = require("../models/inventory-model")

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
    let data = await invModel.getClassifications()

    let list = '<ul class="navigationul">'
    list += '<li><a href="/" title="Home page">Home</a></li>'

    data.rows.forEach((row) => {
        list += `<li>
            <a href="/inv/type/${row.classification_id}" 
               title="See our inventory of ${row.classification_name} vehicles">
               ${row.classification_name}
            </a>
        </li>`
    })

    list += "</ul>"
    return list
}

/* **************************************
* Build classification grid
*************************************** */
Util.buildClassificationGrid = async function (data) {
    let grid = ""

    if (data.length > 0) {
        grid = '<ul id="inv-display">'

        data.forEach(vehicle => {
            grid += `
            <li>
                <a href="../../inv/detail/${vehicle.inv_id}">
                    <img src="${vehicle.inv_thumbnail}" 
                         alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
                </a>

                <div class="namePrice">
                    <hr>
                    <h2>
                        <a href="../../inv/detail/${vehicle.inv_id}">
                            ${vehicle.inv_make} ${vehicle.inv_model}
                        </a>
                    </h2>
                    <span>$${new Intl.NumberFormat('en-US').format(vehicle.inv_price)}</span>
                </div>
            </li>`
        })

        grid += "</ul>"
    } else {
        grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }

    return grid
}

/* **************************************
* Build classification list
*************************************** */
Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications()

    let classificationList =
        '<select name="classification_id" id="classificationList" required>'

    classificationList += "<option value=''>Choose a Classification</option>"

    data.rows.forEach((row) => {
        classificationList += `<option value="${row.classification_id}"`

        if (classification_id && row.classification_id == classification_id) {
            classificationList += " selected "
        }

        classificationList += `>${row.classification_name}</option>`
    })

    classificationList += "</select>"
    return classificationList
}

/* **************************************
* Single vehicle display
*************************************** */
Util.buildSingleVehicleDisplay = async function (data) {
    let grid = `<section id="vehicle-display">
        <div>
            <section class="imagePrice">
                <img src="${data.inv_image}" 
                     alt="Image of ${data.inv_make} ${data.inv_model}">
            </section>

            <section class="vehicleDetail">
                <h3>${data.inv_make} ${data.inv_model} Details</h3>

                <ul id="vehicle-details">
                    <li><h4>Price: $${new Intl.NumberFormat("en-US").format(data.inv_price)}</h4></li>
                    <li><h4>Description:</h4> ${data.inv_description}</li>
                    <li><h4>Color:</h4> ${data.inv_color}</li>
                    <li><h4>Miles:</h4> ${new Intl.NumberFormat("en-US").format(data.inv_miles)}</li>
                </ul>
            </section>
        </div>
    </section>`

    return grid
}

/* **************************************
* Error handler middleware
*************************************** */
Util.handleErrors = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

/* **************************************
* JWT middleware
*************************************** */
Util.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
            req.cookies.jwt,
            process.env.ACCESS_TOKEN_SECRET,
            (err, accountData) => {
                if (err) {
                    req.flash("notice", "Please log in")
                    res.clearCookie("jwt")
                    return res.redirect("/account/login")
                }

                res.locals.accountData = accountData
                res.locals.loggedin = 1
                next()
            }
        )
    } else {
        next()
    }
}

module.exports = Util