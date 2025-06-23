const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inhalt: { type: String, required: true },
  erstelltAm: { type: Date, default: Date.now },
  username: { type: String },
  mediatype: { type: String },
  id: { type: String },
  //rating: { type: Number, min: 1, max: 10 },
  rating: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;