const express = require("express");
const Series = require("../models/Shows"); // Korrekte Referenz auf das Serien-Modell

const router = express.Router();

// Get All Shows
router.get("/", async (req, res) => {
    try {
        const shows = await Series.find(); // Holt alle Serien aus der Datenbank
        res.status(200).json(shows);
    } catch (error) {
        console.error("Fehler beim Abrufen der Serien:", error.message);
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
