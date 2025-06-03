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

// Search by Title
router.get("/:title", async (req, res) => {
    try {
        const game = await Game.findOne({ title: req.params.title }); 

        if (!game) {
            return res.status(404).json({ message: "Spiel nicht gefunden" });
        }

        res.status(200).json(game);
    } catch (error) {
        console.error("Fehler beim Abrufen des Spiels:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesGames.js wurde erfolgreich geladen!");

module.exports = router;