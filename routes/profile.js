var express = require("express")
var router = express.Router()
const profileController = require("../controllers/profile")
const verifyToken = require("../controllers/verifyToken")
const Book = require("../models/book")

router.get("/", verifyToken, profileController.getProfile)

module.exports = router
