const mongoose = require("mongoose");

const showsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    mediatype: { type: String, required: true },
    title: { type: String, required: true },
    genre: { type: [String], required: true },
    seasons: { type: [String], required: true },
    releaseDate: { type: Date, required: true },
    status: { type: String, enum: ["Running", "Ended"], required: true },
    creators: { type: [String], required: true },
    cast: { type: [String], required: true },
    description: { type: String, required: true },
    altersfreigabe: { type: String, required: true},
    rating: { type: Number, min: 0, max: 10 },
    trailerUrl: { type: String },
    coverImage: { type: String } // URL zum Serienposter
});

const Series = mongoose.model("Shows", showsSchema);
module.exports = Series;