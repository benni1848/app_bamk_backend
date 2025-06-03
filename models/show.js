const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  id: String,
  mediatype: String,
  name: String,
  genre: [String],
  director: String,
  seasons: Number,
  published: Date,
  imageUrls: [String],
  trailerUrl: String,
  description: String,
  rating: Number, 
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;