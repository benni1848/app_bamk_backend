const express = require("express");
const bcrypt = require("bcrypt"); //
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

//Registry-Route for User
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    //Password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save User
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Registrierung erfolgreich!" });
});
router.get("/login", (req, res) => {
    res.json({ message: "Login-Route erreichbar!" }); //Maybe Delete just a Test
});

//Login-Route with Password Check
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    //Get User from DB
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden!" });

    //Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Falsches Passwort!" });

    //Login Succesful and TokenCreation
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "2h" });
    res.json({ message: "Login erfolgreich!", token });
});

module.exports = router;