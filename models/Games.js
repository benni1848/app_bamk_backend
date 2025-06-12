const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    mediatype: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    publisher: { type: String, required: true },
    developer: { type: String, required: true },
    platforms: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, min: 0, max: 10 },
    description: { type: String, required: true },
    altersfreigabe: { type: String, required: true },
    coverImage: { type: String }, // URL zum Spielcover
    trailerUrl: { type: String }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;