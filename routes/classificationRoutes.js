const express = require("express")
const router = new express.Router()

router.get("/", (req,res)=>{
  res.send("Classification route working")
})

module.exports = router