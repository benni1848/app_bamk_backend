const express = require("express");
const mongoose = require("mongoose");


const app = express();


const PORT = 3000;
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/filme", (req, res) => {
  res.status(200).send("Login Page");
});

app.get("/filme", (req, res) => {
  res.status(200).send("Registration Page");
});