const express = require("express");
const Game = require("../models/Games");

const router = express.Router();

//Get All Games
router.get("/", async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        console.error("Fehler beim Abrufen der Spiele:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.get("/top10", async (req, res) => {
    try {
        const top10 = await Game.find()
        .sort({ rating: -1 })    // Absteigend sortieren
        .limit(10);
        
        res.status(200).json(top10);
    } catch (error) {
        console.error("Fehler beim Abrufen der Spiele:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Get All Songs (sort by title)
router.get("/title", async (req, res) => {
    try {
        const titlegames = await Game.find()
        .sort({ title: 1 });
        res.status(200).json(titlegames);
    } catch (error) {
        console.error("Fehler beim Abrufen der Spiele:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Title
router.get("/title/:title", async (req, res) => {
    try {
        const titleRegex = new RegExp(req.params.title, 'i'); // Ausschalten der Case-Sensitivity
        const gametitle = await Game.find({ title: titleRegex }); 

        if (!gametitle || gametitle.length === 0) {
            return res.status(404).json({ message: "Film nicht gefunden" });
        }

        res.status(200).json(gametitle);
    } catch (error) {
        console.error("Fehler beim Abrufen des Films:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesGames.js wurde erfolgreich geladen!");

module.exports = router;