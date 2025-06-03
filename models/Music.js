const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    genre: [String],
    year: Number,
    duration: Number,
}, { collection: "music" });

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;