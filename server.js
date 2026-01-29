require('dotenv').config()
const express = require("express")
const session = require("express-session")
const pool = require("./database")
const app = express()

// Middleware
app.use(session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: "sessionId",
}))

app.use(require("connect-flash")())
app.use(function(req, res, next){
  res.locals.messages = require("express-messages")(req, res)
  next()
})

// View Engine
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

// Static Files (optional)
app.use(express.static("public"))

// Routes
const baseController = require("./controllers/baseController")
app.get("/", baseController.buildHome)

// Server
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
