const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  if (req.user) {
    return next()
  }

  var token = req.cookies.accessToken

  if (token === "undefined") {
    req.user = undefined
    return next()
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    req.user = user
    return next()
  })
}
