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
router.get("/title/:title", async (req, res) => {
    try {
        const titleRegex = new RegExp(req.params.title, 'i'); // Ausschalten der Case-Sensitivity
        const movietitle = await Movie.find({ title: titleRegex }); 

        if (!movietitle || movietitle.length === 0) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(movietitle);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by ID
router.get("/id/:id", async (req, res) => {
    try {
        const movieid = await Movie.findOne({ id: req.params.id }); 

        if (!movieid) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(movieid);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search the Top10
router.get("/top10", async (req, res) => {
    try {
        const top10 = await Movie.find()
        .sort({ rating: -1 }) // -1 für absteigend (höchster zuerst)
        .limit(10);

        res.status(200).json(top10);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search the FSK
router.get("/fsk/:altersfreigabe", async (req, res) => {
    try {
        const fskRegex = new RegExp(req.params.altersfreigabe, 'i'); // Ausschalten der Case-Sensitivity
        const fsk = await Movie.find({ altersfreigabe: fskRegex })

        if (!fsk || fsk.length === 0) {
            return res.status(404).json({ message: "Filme nicht gefunden" });
        }

        res.status(200).json(fsk);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesMovies.js wurde erfolgreich geladen!");

module.exports = router;