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

// Search by Title
router.get("/:title", async (req, res) => {
    try {
        const song = await Music.findOne({ title: req.params.title }); 

        if (!song) {
            return res.status(404).json({ message: "Song nicht gefunden" });
        }

        res.status(200).json(song);
    } catch (error) {
        console.error("Fehler beim Abrufen des Songs:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});



// Debug-Log
console.log("musicRoutes.js wurde erfolgreich geladen!");

module.exports = router;