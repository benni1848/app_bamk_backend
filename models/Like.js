const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    mediatype: { type: String, required: true },
    id: { type: String, required: true },
    erstelltAm: { type: Date, default: Date.now },
    vote: { type: Number, required: true, enum: [-1, 0, 1] } // -1 = Dislike, 0 = Neutral, 1 = Like
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;