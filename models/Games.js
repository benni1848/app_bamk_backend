<<<<<<< HEAD
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: [String], required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    platforms: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, min: 0, max: 10 },
    multiplayer: { type: Boolean, required: true },
    description: { type: String, required: true },
    coverImage: { type: String } // URL zum Spielcover
});

const Game = mongoose.model("Game", gameSchema);
=======
const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: [String], required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    platforms: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    rating: { type: Number, min: 0, max: 10 },
    multiplayer: { type: Boolean, required: true },
    description: { type: String, required: true },
    coverImage: { type: String } // URL zum Spielcover
});

const Game = mongoose.model("Game", gameSchema);
>>>>>>> 99af1c23c3544349fd02dde15a47bc9636b58397
module.exports = Game;