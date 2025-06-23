const express = require("express");
const Music = require("../models/Music");

const router = express.Router();

// Get All Songs
router.get("/", async (req, res) => {
    try {
        const songs = await Music.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error("Fehler beim Abrufen der Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search the Top10
router.get("/top10", async (req, res) => {
    try {
        const top10 = await Music.find()
        .sort({ likes: -1 })    // Absteigend sortieren
        .limit(10);

        res.status(200).json(top10);
    } catch (error) {
        console.error("Fehler beim Abrufen der Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Songs (sort by title)
router.get("/title", async (req, res) => {
    try {
        const titlesongs = await Music.find()
        .sort({ title: 1 });
        res.status(200).json(titlesongs);
    } catch (error) {
        console.error("Fehler beim Abrufen der Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Songs (sort by date)
router.get("/new", async (req, res) => {
    try {
        const datesongs = await Music.find()
        .sort({ releaseDate: -1 });
        res.status(200).json(datesongs);
    } catch (error) {
        console.error("Fehler beim Abrufen der Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Title
router.get("/title/:title", async (req, res) => {
    try {
        const titleRegex = new RegExp(req.params.title, 'i'); // Ausschalten der Case-Sensitivity
        const songtitle = await Music.find({ title: titleRegex }); 

        if (!songtitle || songtitle.length === 0) {
            return res.status(404).json({ message: "Song nicht gefunden" });
        }

        res.status(200).json(songtitle);
    } catch (error) {
        console.error("Fehler beim Abrufen des Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});



// Debug-Log
console.log("musicRoutes.js wurde erfolgreich geladen!");

module.exports = router;