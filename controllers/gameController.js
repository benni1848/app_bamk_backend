const Movie = require("../models/game");

async function getAllGames(req, res) {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getGameById(req, res) {
  const { id } = req.params;
  try {
    const game = await Game.findOne({ id: id });
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllGames,
  getGameById,
};