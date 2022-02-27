module.exports.getLogin = (req, res, next) => {
  const errorMessage = req.flash("errorMessage")[0]
  const error = req.flash("error")[0]

  res.render("login", {
    errorMessage: errorMessage,
    error: error,
  })
}
