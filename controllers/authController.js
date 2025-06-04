const User = require("../models/user");
const express = require('express');
//const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'geheimesPasswort123',
  resave: false,
  saveUninitialized: false
}));

/*
mongoose.connect('mongodb://localhost:3000/authDemo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
*/

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());