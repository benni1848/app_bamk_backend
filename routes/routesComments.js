const express = require("express");
const Comment = require("../models/Comments.js");
const Movie = require("../models/Movie.js");
const Game = require("../models/Games.js");
const Music = require("../models/Music.js");
const Series = require("../models/Shows.js");

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

// Search the Top10
router.get("/last10", async (req, res) => {
    try {
        const last10 = await Comment.find()
        .sort({ erstelltAm: -1 }) // -1 für absteigend
        .limit(10);

        res.status(200).json(last10);
    } catch (error) {
        console.error("Fehler beim Abrufen der letzten 10 Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

router.get("/new", async (req, res) => {
    try {
        const datecomments = await Comment.find()
        .sort({ erstelltAm: -1 });
        res.status(200).json(datecomments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Filme:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search Comment by Username
router.get("/:username", async (req, res) => {
    try {
        const comments = await Comment.find({ username: req.params.username }); 

        if (!comments) {
            return res.status(404).json({ message: "Kommentare nicht gefunden" });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Kommentare lesen (Spiele)
router.get("/games", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: "1" });
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
router.post("/games", async (req,res) => {
    try {
        const { title, inhalt, id, username, rating } = req.body;
        const mediatype = "1";    // festgelegter Medientyp

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype }, // Kriterium: gleicher Nutzer + gleiche ID + gleicher Mediatype
        {
            title,
            inhalt,
            erstelltAm: Date.now(), // Optional: aktualisiere das Datum
            rating: Number(rating)
        },
        { new: true, upsert: true } // new = Rückgabe des neuen Eintrags, upsert = erstellen wenn nicht vorhanden
        );

        const alleKommentare = await Comment.find({ id, mediatype });
        const ratings = alleKommentare.map(k => k.rating).filter(r => typeof r === "number" && !isNaN(r));
        let durchschnitt = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        // Movie-Rating aktualisieren
        if (durchschnitt !== null) {
            durchschnitt = parseFloat(durchschnitt.toFixed(1));
            await Game.findOneAndUpdate(
                { id, mediatype },
                { rating: durchschnitt }
            );
        }

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
    console.log("POST eingegangen:", req.body);
});

// Kommentare lesen (Filme)
router.get("/movies", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: "2" });
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
router.post("/movies", async (req, res) => {
    try {
        const { title, inhalt, id, username, rating } = req.body;
        const mediatype = "2";

        // Kommentar speichern/aktualisieren
        const aktualisierterKommentar = await Comment.findOneAndUpdate(
            { username, id, mediatype },
            {
                title,
                inhalt,
                erstelltAm: Date.now(),
                rating: Number(rating)
            },
            { new: true, upsert: true }
        );

        // Alle Ratings für diesen Film holen
        const alleKommentare = await Comment.find({ id, mediatype });
        const ratings = alleKommentare.map(k => k.rating).filter(r => typeof r === "number" && !isNaN(r));
        let durchschnitt = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        // Movie-Rating aktualisieren
        if (durchschnitt !== null) {
            durchschnitt = parseFloat(durchschnitt.toFixed(1));
            await Movie.findOneAndUpdate(
                { id, mediatype },
                { rating: durchschnitt }
            );
        }

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
    console.log("POST eingegangen:", req.body);
});

// Kommentare lesen (Musik)
router.get("/music", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: "3" });
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
router.post("/music", async (req,res) => {
    try {
        const { title, inhalt, id, username } = req.body;
        const mediatype = "3";

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype },
        {
            title,
            inhalt,
            erstelltAm: Date.now()
            
        },
        { new: true, upsert: true }
        );

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
    console.log("POST eingegangen:", req.body);
});

// Kommentare lesen (Serien)
router.get("/shows", async (req, res) => {
    try {
        const comments = await Comment.find({ mediatype: "4" });
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
router.post("/shows", async (req,res) => {
    try {
        const { title, inhalt, id, username, rating } = req.body;
        const mediatype = "4";

        const aktualisierterKommentar = await Comment.findOneAndUpdate(
        { username, id, mediatype },
        {
            title,
            inhalt,
            erstelltAm: Date.now(),
            rating: Number(rating)
        },
        { new: true, upsert: true }
        );

        const alleKommentare = await Comment.find({ id, mediatype });
        const ratings = alleKommentare.map(k => k.rating).filter(r => typeof r === "number" && !isNaN(r));
        let durchschnitt = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

        // Movie-Rating aktualisieren
        if (durchschnitt !== null) {
            durchschnitt = parseFloat(durchschnitt.toFixed(1));
            await Series.findOneAndUpdate(
                { id, mediatype },
                { rating: durchschnitt }
            );
        }

        res.status(200).json(aktualisierterKommentar);
    } catch (error) {
        console.error("Fehler beim Posten des Kommentars:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesComments.js wurde erfolgreich geladen!");

module.exports = router;