var express = require("express")
var router = express.Router()

const verifyToken = require("../controllers/verifyToken")

const User = require("../models/user")
const Book = require("../models/book")

const {
  registerValidation,
  loginValidation,
} = require("../controllers/validation")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  // USER DATA VALIDATION
  const { error } = registerValidation(req.body)
  if (error) {
    req.flash("errorMessage", error.details[0].message)
    req.flash("error", "true")

    return res.redirect("/register")
  }

  // CHECKING IF EMAIL ALREADY EXISTS
  const registeredUser = await User.findOne({ email: req.body.email })

  if (registeredUser) {
    req.flash("errorMessage", "Email already exists!")
    req.flash("error", "true")

    return res.redirect("/register")
  }

  // ENCRYPTING PASSWORDS
  const salt = await bcrypt.genSalt(10)
  const encryptedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
  })

  try {
    const savedUser = await user.save()
    TOKEN_SECRET = "742269"
    const token = jwt.sign({ _id: savedUser._id }, TOKEN_SECRET)

    res.cookie("accessToken", token, {
      httpOnly: true,
    })

    res.redirect("/home")
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/login", async (req, res) => {
  // USER DATA VALIDATION
  const { error } = loginValidation(req.body)
  if (error) {
    req.flash("errorMessage", error.details[0].message)
    req.flash("error", "true")

    return res.redirect("/login")
  }

  // CHECKING IF EMAIL EXISTS
  const registeredUser = await User.findOne({ email: req.body.email })
  if (!registeredUser) {
    req.flash("errorMessage", "Incorrect Email/Password")
    req.flash("error", "true")

    return res.redirect("/login")
  }

  // DECRYPTING AND CHECKING PASSWORD
  const validLogin = await bcrypt.compare(
    req.body.password,
    registeredUser.password
  )
  if (!validLogin) {
    req.flash("errorMessage", "Incorrect Email/Password")
    req.flash("error", "true")
    return res.redirect("/login")
  }

  // CREATING A TOKEN
  TOKEN_SECRET = "742269"
  const token = jwt.sign({ _id: registeredUser._id }, TOKEN_SECRET)

  res.cookie("accessToken", token, {
    httpOnly: true,
  })

  res.redirect("/home")
})

router.post("/logout", async (req, res) => {
  res.cookie("accessToken", "undefined")
  res.redirect("/home")
})

router.post("/upload", verifyToken, async (req, res) => {
  if (req.user) {
    const book = new Book({
      title: req.body.title,
      desc: req.body.desc,
      link: req.body.link,
      uploader: req.user._id,
    })
    try {
      const savedBook = await book.save()
      res.redirect("/profile")
    } catch (err) {
      res.status(400).send(err)
    }
  } else {
    res.status(400).send("Please Login First!")
  }
})

router.post("/update", verifyToken, async (req, res) => {
  if (req.user) {
    const editingBook = await Book.find({ title: req.body.oldTitle })
    editingBook.forEach(async (book) => {
      if (req.user._id == book.uploader) {
        book.title = req.body.title
        book.desc = req.body.desc
        book.link = req.body.link
        await book.save()
      }
    })
  } else {
    console.log("Please Login First!")
  }

  setTimeout(function () {
    console.log("updating")
  }, 500)

  try {
    res.redirect("/profile")
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/delete", verifyToken, async (req, res) => {
  if (req.user) {
    const deletingBook = await Book.find({ title: req.body.title })
    deletingBook.forEach(async (book) => {
      if (req.user._id == book.uploader) {
        await Book.deleteOne({ title: book.title, uploader: book.uploader })
      }
    })
  } else {
    console.log("Please Login First!")
  }

  try {
    res.redirect("/profile")
  } catch (err) {
    res.status(400).send(err)
  }
})
// api/user/search
router.post("/search", async (req, res) => {
  req.flash("searchText", req.body.searchText)

  try {
    res.redirect("/home")
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
