const express = require("express");
const Series = require("../models/Shows");

const router = express.Router();

// Get All Shows
router.get("/", async (req, res) => {
    try {
        const shows = await Series.find();
        res.status(200).json(shows);
    } catch (error) {
        console.error("Fehler beim Abrufen der Serien:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Shows (sort by date)
router.get("/new", async (req, res) => {
    try {
        const dateshows = await Series.find()
        .sort({ releaseDate: -1 });
        res.status(200).json(dateshows);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Shows (sort by title)
router.get("/title", async (req, res) => {
    try {
        const titleshows = await Series.find()
        .sort({ title: 1 });
        res.status(200).json(titleshows);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Title
router.get("/:title", async (req, res) => {
    try {
        const show = await Series.findOne({ title: req.params.title });

        if (!show) {
            return res.status(404).json({ message: "Serie nicht gefunden" });
        }

        res.status(200).json(show);
    } catch (error) {
        console.error("Fehler beim Abrufen der Serie:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesShows.js wurde erfolgreich geladen!");

module.exports = router;
