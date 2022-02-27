var express = require("express")
var router = express.Router()
const homeController = require("../controllers/home")
const verifyToken = require("../controllers/verifyToken")

router.get("/", verifyToken, homeController.renderHome)

module.exports = router
