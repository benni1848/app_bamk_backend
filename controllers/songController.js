const Movie = require("../models/song");

async function getAllSongs(req, res) {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSongById(req, res) {
  const { id } = req.params;
  try {
    const song = await Song.findOne({ id: id });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.status(200).json(song);
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllSongs,
  getSongById,
};