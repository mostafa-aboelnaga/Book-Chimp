const Book = require("../models/book")

module.exports.getProfile = async (req, res, next) => {
  console.log("getProfile", req.user)
  if (req.user) {
    const userBooks = await Book.find({ uploader: req.user._id })
    res.render("profile", {
      userBooks: userBooks,
    })
  } else {
    res.redirect("/login")
  }
}
