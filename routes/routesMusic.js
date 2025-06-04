const express = require("express");
const Music = require("../models/Music");

const router = express.Router();

// Get All Songs
router.get("/music", async (req, res) => {
    try {
        const songs = await Music.find();
        res.status(200).json(songs);
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