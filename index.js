const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cors = require("cors");


const movieRoutes = require("./routes/routesMovies"); // Film-Route
const musicRoutes = require("./routes/routesMusic");  // Musik-Route
const showRoutes = require("./routes/routesShows");   // Serien-Route
const gameRoutes = require("./routes/routesGames");   // Spiele-Route
const authRoutes = require("./routes/auth"); // Auth-Route

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

//MongoDB Atlas Connection and JWT
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.JWT_SECRET;

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
});