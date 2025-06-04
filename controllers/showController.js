const Movie = require("../models/show");

async function getAllShows(req, res) {
  try {
    const shows = await Show.find();
    res.status(200).json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getShowById(req, res) {
  const { id } = req.params;
  try {
    const show = await Show.findOne({ id: id });
    if (!show) return res.status(404).json({ error: "Show not found" });
    res.status(200).json(show);
  } catch (error) {
    console.error("Error fetching show:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllShows,
  getShowById,
};