const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: [String], required: true },
  director: { type: String, required: true },
  producer: { type: String }, // Falls benötigt
  duration: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, min: 0, max: 10 },
  description: { type: String, required: true },
  cast: { type: [String] }, // Liste von Schauspielern
  trailerUrl: { type: String },
  coverImage: { type: String } // URL zum Filmcover
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;