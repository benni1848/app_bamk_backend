const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String },
  username: { type: String },
  password: { type: String },
  comments: { type: Number },
  profilePicture: { type: String},
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;