const express = require('express')
const session = require('express-session')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 10000

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// View engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Routes
const inventoryRoutes = require('./routes/inventory-routes')
app.use('/inventory', inventoryRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).render('errors/404', { title: 'Not Found' })
})

// 500 handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('errors/500', { title: 'Server Error' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))