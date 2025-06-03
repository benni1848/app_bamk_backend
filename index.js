require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
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
});