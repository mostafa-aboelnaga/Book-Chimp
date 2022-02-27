const dotenv = require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var flash = require("connect-flash")
var logger = require("morgan")
var session = require("express-session")

// DATABASE
const mongoose = require("mongoose")
mongoose.connect(
  "mongodb+srv://test_user:123@cluster74.et9qm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("Conneted to DB!")
)

const userModel = require("./models/user")
const bookModel = require("./models/book")

// ROUTERS
var indexRouter = require("./routes/index")
var homeRouter = require("./routes/home")
var loginRouter = require("./routes/login")
var registerRouter = require("./routes/register")

var aboutRouter = require("./routes/about")
var profileRouter = require("./routes/profile")
var usersRouter = require("./routes/users")
var authRouter = require("./routes/auth")

var app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(flash())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/home", homeRouter)
app.use("/login", loginRouter)
app.use("/register", registerRouter)
app.use("/about", aboutRouter)
app.use("/profile", profileRouter)
app.use("/users", usersRouter)
app.use("/api/user", authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
