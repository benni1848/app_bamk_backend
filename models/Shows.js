const mongoose = require("mongoose");

const showsSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: [String], required: true },
    seasons: { type: Number, required: true },
    episodes: { type: Number, required: true },
    releaseYear: { type: Number, required: true },
    status: { type: String, enum: ["Running", "Ended"], required: true },
    creators: { type: [String], required: true },
    cast: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
    posterImage: { type: String } // URL zum Serienposter
});

const Series = mongoose.model("Shows", showsSchema);
module.exports = Series;