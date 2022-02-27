var express = require("express")
var router = express.Router()
const loginController = require("../controllers/login")

const checkLogged = (req, res, next) => {
  if (req.cookies.accessToken && req.cookies.accessToken != "undefined") {
    res.redirect("/home")
  } else {
    next()
  }
}

router.get("/", checkLogged, loginController.getLogin)

module.exports = router
