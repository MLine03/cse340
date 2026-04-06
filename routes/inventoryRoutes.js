const express = require("express")
const router = new express.Router()

router.get("/", (req,res)=>{
  res.send("Inventory route working")
})

module.exports = router

router.get("/trigger-error", (req, res, next) => {
  const err = new Error("Intentional 500 error")
  err.status = 500
  next(err)
})