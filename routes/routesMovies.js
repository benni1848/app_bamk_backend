const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// Get All Movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json(movies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Title
router.get("/:title", async (req, res) => {
    try {
        const movie = await Movie.findOne({ title: req.params.title }); 

        if (!movie) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status500.json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesMovies.js wurde erfolgreich geladen!");

module.exports = router;