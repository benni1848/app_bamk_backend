const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    titel: String,
    genre: [String],
    mitwirkende: [String],
    laufzeit: Number,
    erscheinungsdatum: String,
    nutzerwertung_prozent: Number,
    nutzerwertung_sterne: Number,
    beschreibung: String,
    trailer_link: String,
    altersfreigabe: String
}, { collection: "movies" });

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;