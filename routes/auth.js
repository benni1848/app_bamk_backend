const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Token-Generierung mit Ablaufzeit (24h)
const generateToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "2h" });
};

// Formatierungsfunktion für EU-Zeiten
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

// Registrierung
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

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Login-Anfrage erhalten für:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("Benutzer nicht gefunden:", username);
      return res.status(404).json({ message: "Benutzer nicht gefunden!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Falsches Passwort für:", username);
      return res.status(400).json({ message: "Falsches Passwort!" });
    }

    const token = generateToken(user._id);
    const decoded = jwt.decode(token);
    const expiresAtEU = formatDateEU(decoded.exp);

    console.log("Token Ablaufzeit:", expiresAtEU);

    res.json({ message: "Login erfolgreich!", token, expiresAt: expiresAtEU });
  } catch (error) {
    console.error("Serverfehler:", error.message);
    res.status(500).json({ message: "Serverfehler!", error });
  }
});

console.log("auth.js wurde erfolgreich geladen!");
module.exports = router;