require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/routesMovies");
const musicRoutes = require("./routes/routesMusic");
const showRoutes = require("./routes/routesShows");
const gameRoutes = require("./routes/routesGames");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/routesComments");
const ticketRoutes = require("./routes/routesTickets");


const app = express();

// Umgebungsvariablen
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST_IP || "localhost";
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.JWT_SECRET;

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

// MongoDB-Verbindung
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

app.use("/comments", commentRoutes);
app.use("/tickets", ticketRoutes);

// Server-Start
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf http://${HOST}:${PORT}`);
});