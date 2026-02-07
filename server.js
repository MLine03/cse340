const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const utilities = require("./utilities/getNav")

dotenv.config()

const app = express()

/* Middleware */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

/* Session */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
  })
)

/* Flash */
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

/* View engine */
app.set("view engine", "ejs")

/* Routes */
const accountRouter = require("./routes/accountRoute")
const inventoryRoute = require("./routes/inventoryRoute")

app.use("/account", accountRouter)
app.use("/inv", inventoryRoute)

/* Home */
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Home",
    nav: await utilities.getNav(),
    success: [],
    error: [],
  })
})

/* 404 */
app.use(async (req, res) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    nav: await utilities.getNav(),
    success: [],
    error: [],
    message: "Sorry, the page you requested could not be found.",
  })
})

module.exports = app
