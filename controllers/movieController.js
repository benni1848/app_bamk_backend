const Movie = require("../models/movie");

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMovieById(req, res) {
  const { id } = req.params;
  try {
    const movie = await Movie.findOne({ id: id });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
};