const express = require('express')
const router = express.Router()

router.get('/manage', (req, res) => {
  res.send('Account management page working')
})

module.exports = router