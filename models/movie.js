const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  mediatype: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  director: { type: String, required: true },
  producer: { type: String },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 10 },
  description: { type: String, required: true },
  altersfreigabe: { type: String, required: true },
  cast: { type: [String] },
  trailerUrl: { type: String },
  coverImage: { type: String }
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;