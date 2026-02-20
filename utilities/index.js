// utilities/index.js
// Re-export functions from utilities.js

const { handleErrors, buildVehicleDetail, getNav } = require("./utilities.js")

module.exports = { handleErrors, buildVehicleDetail, getNav }