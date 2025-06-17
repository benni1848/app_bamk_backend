const express = require("express");
const Comment = require("../models/Comments");

const router = express.Router();

// Kommentare lesen
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kommentare lesen (Spiele)
router.get("/games", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: 1 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Test-Form für Input-Testing
router.get('/games/comment', (req, res) => {
    res.render('formgame');
});

// Kommentar posten (Spiel)
router.post("/games/comment/post", async (req,res) => {
    try {
        const { title, inhalt, id } = req.body;

        const username = "Baker"; // festgelegter Nutzername
        const mediatype = "1";    // festgelegter Medientyp

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype }, // Kriterium: gleicher Nutzer + gleiche ID + gleicher Mediatype
        {
            title,
            inhalt,
            erstelltAm: Date.now() // Optional: aktualisiere das Datum
        },
        { new: true, upsert: true } // new = Rückgabe des neuen Eintrags, upsert = erstellen wenn nicht vorhanden
        );

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kommentare lesen (Filme)
router.get("/movies", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: 2 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Test-Form für Input-Testing
router.get('/movies/comment', (req, res) => {
    res.render('formmovie');
});

// Kommentar posten (Film)
router.post("/movies/comment/post", async (req,res) => {
    try {
        const { title, inhalt, id } = req.body;

        const username = "Baker"; // festgelegter Nutzername
        const mediatype = "2";    // festgelegter Medientyp

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype }, // Kriterium: gleicher Nutzer + gleiche ID + gleicher Mediatype
        {
            title,
            inhalt,
            erstelltAm: Date.now() // Optional: aktualisiere das Datum
        },
        { new: true, upsert: true } // new = Rückgabe des neuen Eintrags, upsert = erstellen wenn nicht vorhanden
        );

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kommentare lesen (Musik)
router.get("/music", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: 3 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Test-Form für Input-Testing
router.get('/music/comment', (req, res) => {
    res.render('formmusic');
});

// Kommentar posten (Musik)
router.post("/music/comment/post", async (req,res) => {
    try {
        const { title, inhalt, id } = req.body;

        const username = "Baker"; // festgelegter Nutzername
        const mediatype = "3";    // festgelegter Medientyp

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype }, // Kriterium: gleicher Nutzer + gleiche ID + gleicher Mediatype
        {
            title,
            inhalt,
            erstelltAm: Date.now() // Optional: aktualisiere das Datum
        },
        { new: true, upsert: true } // new = Rückgabe des neuen Eintrags, upsert = erstellen wenn nicht vorhanden
        );

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kommentare lesen (Serien)
router.get("/shows", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: 4 });
        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Test-Form für Input-Testing
router.get('/shows/comment', (req, res) => {
    res.render('formshow');
});

// Kommentar posten (Serie)
router.post("/shows/comment/post", async (req,res) => {
    try {
        const { title, inhalt, id } = req.body;

        const username = "Baker"; // festgelegter Nutzername
        const mediatype = "4";    // festgelegter Medientyp

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype }, // Kriterium: gleicher Nutzer + gleiche ID + gleicher Mediatype
        {
            title,
            inhalt,
            erstelltAm: Date.now() // Optional: aktualisiere das Datum
        },
        { new: true, upsert: true } // new = Rückgabe des neuen Eintrags, upsert = erstellen wenn nicht vorhanden
        );

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesGames.js wurde erfolgreich geladen!");

module.exports = router;