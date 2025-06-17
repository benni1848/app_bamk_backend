const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Funktion for European TIme
function formatDateEU(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("de-DE", { 
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

// Registry-Route for User
router.post("/register", async (req, res) => {
    console.log("Registrierungs-Anfrage erhalten mit:", req.body);

    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Benutzername bereits vergeben!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        console.log("Neuer Nutzer erfolgreich gespeichert!");
        res.status(201).json({ message: "Registrierung erfolgreich!" });
    } catch (error) {
        console.error("Fehler bei der Registrierung:", error.message);
        res.status(500).json({ message: "Serverfehler" });
    }
});

// Login-Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log("Login-Anfrage erhalten für:", username); // Debugging

        const user = await User.findOne({ username }); // Check if User exists
        if (!user) {
            console.log("Benutzer nicht gefunden:", username);
            return res.status(404).json({ message: "Benutzer nicht gefunden!" });
        }

        console.log("Gespeichertes Passwort:", user.password); // Debugging
        console.log("Eingegebenes Passwort:", password); // Debugging

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Passwort-Vergleich:", isMatch); // Debugging

        if (!isMatch) {
            console.log("Falsches Passwort für:", username);
            return res.status(400).json({ message: "Falsches Passwort!" });
        }

        // Token with Expiration-Date
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        // Show Expiration Date in Console

        const decoded = jwt.decode(token);
        const expiresAtEU = formatDateEU(decoded.exp); // Convert to EU-Format

        console.log("Token Ablaufzeit:", expiresAtEU);

        res.json({ message: "Login erfolgreich!", token, expiresAt: expiresAtEU });
    } catch (error) {
        console.error("Serverfehler:", error.message);
        res.status(500).json({ message: "Serverfehler!", error });
    }
});

module.exports = router;