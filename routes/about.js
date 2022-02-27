var express = require("express")
var router = express.Router()
const verifyToken = require("../controllers/verifyToken")

router.get("/", verifyToken, (req, res, next) => {
  if (req.user) {
    res.render("about", {
      userid: req.user._id,
    })
  } else {
    res.render("about", {
      userid: null,
    })
  }
})

module.exports = router
