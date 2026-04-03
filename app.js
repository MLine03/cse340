const express = require("express")
const path = require("path")
const expressLayouts = require("express-ejs-layouts")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static files
app.use(express.static(path.join(__dirname, "public")))

// ----- VIEW ENGINE FIX FOR RENDER -----
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "layouts/layout")

// Routes
app.use("/", require("./routes/home"))
app.use("/inv", require("./routes/inventoryRoutes"))
app.use("/account", require("./routes/accountRoutes"))
app.use("/classification", require("./routes/classificationRoutes"))

// 404 handler
app.use((req,res)=>{
  res.status(404).render("errors/404", { title: "404 Not Found" })
})

// 500 handler
app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).render("errors/500", { title: "Server Error" })
})

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))