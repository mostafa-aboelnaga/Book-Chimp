const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  desc: {
    type: String,
    required: true,
    min: 10,
    max: 280,
  },
  link: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Book", bookSchema)
