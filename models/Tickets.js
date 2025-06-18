const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    userName: String,
    message: String,
    status:{type: String, default: "offen"},
    timestamp:{type: Date, default: Date.now}
});

module.exports = mongoose.model("Tickets", ticketSchema);