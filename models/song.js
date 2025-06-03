const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: String,
  mediatype: String,
  name: String,
  genre: [String],
  artist: [String],
  duration: Number,
  published: Date,
  imageUrls: [String],
  songUrl: String,
  rating: Number, 
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;