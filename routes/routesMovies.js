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

// Get All Movies (sort by date)
router.get("/new", async (req, res) => {
    try {
        const datemovies = await Movie.find()
        .sort({ releaseDate: -1 });
        res.status(200).json(datemovies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Movies (sort by title)
router.get("/title", async (req, res) => {
    try {
        const titlemovies = await Movie.find()
        .sort({ title: 1 });
        res.status(200).json(titlemovies);
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

// Get All Movies (sort by ID)
router.get("/id", async (req, res) => {
    try {
        const idmovies = await Movie.find()
        .sort({ id: 1 });
        res.status(200).json(idmovies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
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

// Get All Movies (sort by director)
router.get("/director", async (req, res) => {
    try {
        const directormovies = await Movie.find()
        .sort({ director: 1 });
        res.status(200).json(directormovies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Director
router.get("/director/:director", async (req, res) => {
    try {
        const directorRegex = new RegExp(req.params.director, 'i'); // Ausschalten der Case-Sensitivity
        const moviedirector = await Movie.find({ director: directorRegex }); 

        if (!moviedirector || moviedirector.length === 0) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(moviedirector);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Movies (sort by duration [long])
router.get("/duration/long", async (req, res) => {
    try {
        const durationlongmovies = await Movie.find()
        .sort({ duration: -1 });
        res.status(200).json(durationlongmovies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Movies (sort by duration [short])
router.get("/duration/short", async (req, res) => {
    try {
        const durationshortmovies = await Movie.find()
        .sort({ duration: 1 });
        res.status(200).json(durationshortmovies);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
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
        const moviefsk = await Movie.find({ altersfreigabe: fskRegex })

        if (!moviefsk || moviefsk.length === 0) {
            return res.status(404).json({ message: "Filme nicht gefunden" });
        }

        res.status(200).json(moviefsk);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Genre
router.get("/genre/:genre", async (req, res) => {
    try {
        const genreRegex = new RegExp(req.params.genre, 'i'); // Ausschalten der Case-Sensitivity
        const moviegenre = await Movie.find({ genre: genreRegex }); 

        if (!moviegenre || moviegenre.length === 0) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(moviegenre);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesMovies.js wurde erfolgreich geladen!");

module.exports = router;