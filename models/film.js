const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
  id: String,
  name: String,
  genre: [String],
  director: String,
  duration: Number,
  published: Date,
  imageUrls: [String],
  trailer: String,
  description: String,
  rating: Number, 
});

const Film = mongoose.model("Film", filmSchema);

module.exports = Film;