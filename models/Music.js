const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
    id: { type: String, required: true },
    mediatype: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: [String], required: true },
    label: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: [String], required: true},
    explicit: { type: Boolean },
    releaseDate: { type: Date },
    duration: { type: Number, required: true },
    coverImage: { type: String },
    likes: { type: Number },
    dislikes: { type: Number }
}, { collection: "music" });

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;