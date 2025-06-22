require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const movieRoutes = require("./routes/routesMovies");
const musicRoutes = require("./routes/routesMusic");
const showRoutes = require("./routes/routesShows");
const gameRoutes = require("./routes/routesGames");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/routesComments.js");
const commenttickets = require("./routes/routesTickets");
const userRoutes = require("./routes/routesUser.js");
const likeRoutes = require("./routes/routesLikes.js");

const app = express();

// Umgebungsvariablen
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST_IP || "localhost";
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.JWT_SECRET;

// Middlewares
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRoutes);

// MongoDB-Verbindung
mongoose.connect(MONGO_URI, {
})
.then(() => console.log("MongoDB verbunden mit BAMK-Datenbank"))
.catch((err) => console.error("MongoDB-Verbindungsfehler:", err.message));

// Test-Route
app.get("/", (req, res) => {
  res.send("<h1> Server läuft erfolgreich!</h1>");
});

// API-Routen
app.use("/movies", movieRoutes);
app.use("/music", musicRoutes);
app.use("/shows", showRoutes);
app.use("/games", gameRoutes);
app.use("/tickets", commenttickets);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);
app.use("/likes", likeRoutes);

// Server-Start
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server läuft auf http://${HOST}:${PORT}`);
});