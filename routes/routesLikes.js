const express = require("express");
const Like = require("../models/Like.js");
const Music = require("../models/Music");

const router = express.Router();

// Likes und Dislikes Lesen
router.get("/", async (req, res) => {
    try {
        const likes = await Like.find();
        res.status(200).json(likes);
    } catch (error) {
        console.error("Fehler beim Abrufen der Likes:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Likes und Dislikes nach Datum sortieren
router.get("/new", async (req, res) => {
    try {
        const datelikes = await Like.find()
        .sort({ erstelltAm: -1 });
        res.status(200).json(datelikes);
    } catch (error) {
        console.error("Fehler beim Abrufen der Likes:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Likes und Dislikes nach Username durchsuchen
router.get("/:username", async (req, res) => {
    try {
        const like = await Like.find({ username: req.params.username }); 

        if (!like) {
            return res.status(404).json({ message: "Likes nicht gefunden" });
        }

        res.status(200).json(like);
    } catch (error) {
        console.error("Fehler beim Abrufen der Kommentare:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Test-Form für Input-Testing
router.get('/post/new', (req, res) => {
    res.render('formmusiclikes');
});

// Like oder Dislike posten
router.post("/post", async (req, res) => {

    
    async function recalculateMusicVotes(songId) {
        const likeCount = await Like.countDocuments({ id: songId, mediatype: "3", vote: 1 });
        const dislikeCount = await Like.countDocuments({ id: songId, mediatype: "3", vote: -1 });
        await Music.updateOne(
            { id: songId },
            { $set: { likes: likeCount, dislikes: dislikeCount } }
        );
    }

    const { username, id, vote } = req.body;
    const numericVote = Number(vote);

    if (![1, -1, 0].includes(numericVote)) {
        return res.status(400).json({ message: "Ungültiger Vote-Wert" });
    }

    try {
        const existing = await Like.findOne({ username, id, mediatype: "3" });
        const musicDoc = await Music.findOne({ id: id });
        if (!musicDoc) return res.status(404).json({ message: "Song nicht gefunden" });

        if (numericVote === 0) {
            if (existing) {
                await existing.deleteOne();
            }
            await recalculateMusicVotes(id);
            return res.status(200).json({ message: "Like/Dislike entfernt" });
        }

        if (existing) {
            if (existing.vote !== numericVote) {
                existing.vote = numericVote;
                await existing.save();
            }
            await recalculateMusicVotes(id);
            return res.status(200).json({ message: "Vote aktualisiert" });
        } else {
            await Like.create({ username, id, mediatype: "3", vote: numericVote });
            await recalculateMusicVotes(id);
            return res.status(201).json({ message: "Vote gespeichert" });
        }

    } catch (error) {
        console.error("Fehler beim Like/Dislike:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesLikes.js wurde erfolgreich geladen!");

module.exports = router;