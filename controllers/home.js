const Book = require("../models/book")

module.exports.renderHome = async (req, res, next) => {
  let allBooks = await Book.find()
  let searchText = req.flash("searchText")[0] || null

  let books = []

  if (searchText != null) {
    console.log(searchText)
    books = allBooks.filter((book) => {
      return book.title.toUpperCase().search(searchText.toUpperCase()) != -1
    })
  } else {
    books = allBooks
  }

  if (req.user) {
    console.log(req.user._id)
    res.render("home", {
      books: books,
      userid: req.user._id,
    })
  } else {
    res.render("home", {
      books: books,
      userid: null,
    })
  }
}
