const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  id: String,
  mediatype: String,
  name: String,
  genre: [String],
  publisher: String,
  studio: String,
  published: Date,
  imageUrls: [String],
  trailerUrl: String,
  description: String,
  rating: Number, 
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;