const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: String,
  mediatype: String,
  name: String,
  genre: [String],
  director: String,
  duration: Number,
  published: Date,
  imageUrls: [String],
  trailerUrl: String,
  description: String,
  rating: Number, 
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;