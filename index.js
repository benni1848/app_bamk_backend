const express = require("express");
const mongoose = require("mongoose");


const app = express();



const PORT = 3000;
 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).send("kev der king!");
});