const express = require("express");
const User = require("../models/User");
const router = express.Router();

//Get All User
router.get("/", async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerinformationen:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by Username
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }); 

        if (!user) {
            return res.status(404).json({ message: "User nicht gefunden" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Fehler beim Abrufen des Users:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Search by UserID
router.get("/id/:id", async (req, res) => {
    try {
        const userid = await User.findOne({ id: req.params.id }); 

        if (!userid) {
            return res.status(404).json({ message: "User nicht gefunden" });
        }

        res.status(200).json(userid);
    } catch (error) {
        console.error("Fehler beim Abrufen des Users:", error.message);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
});

// Debug-Log
console.log("routesUser.js wurde erfolgreich geladen!");

module.exports = router;
