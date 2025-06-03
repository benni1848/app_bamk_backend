require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config();

const movieRoutes = require("./routes/routesMovies"); // Film-Route
const musicRoutes = require("./routes/routesMusic");  // Musik-Route
const showRoutes = require("./routes/routesShows");   // Serien-Route
const gameRoutes = require("./routes/routesGames");   // Spiele-Route

const app = express();
const PORT = 3000;

app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Atlas verbunden mit der BAMK-Datenbank!"))
    .catch((err) => console.error("Fehler bei MongoDB-Verbindung:", err.message));

// Check if Server is Runnung Standart-Route
app.get("/", (req, res) => {
    res.send("<h1>Server läuft erfolgreich!</h1>");
});

// API-Routes
app.use("/movies", movieRoutes);
app.use("/music", musicRoutes);  
app.use("/shows", showRoutes);   
app.use("/games", gameRoutes);   

// Server startt
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
=======
const multer = require("multer");
const path = require("path");
const passport = require("passport");

const authController = require("./controllers/authController");
const movieController = require("./controllers/movieController");

const app = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB could not connect:", err);
  });

app.get("/", (req, res) => {
  res.status(200).send("Connected to the server");
});

app.post("/auth/login", (req, res) => {
  authController.login(req, res);
});

app.post("/auth/register", (req, res) => {
  authController.register(req, res);
});

app.post("/auth/status", (req, res) => {
  authController.status(req, res);
});

app.get("/auth/logout", (req, res) => {
  authController.logout(req, res);
});

app.get("/movies/:id", (req, res) => {
  movieController.getMovieById(req, res);
});

app.get("/movies", (req, res) => {
  movieController.getAllMovies(req, res);
>>>>>>> f5b51edf5dea9380709d150ff1f61ba4c605f2c9
});