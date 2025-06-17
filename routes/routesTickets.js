const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { userName, message } = req.body;

  if (!userName || !message) {
    return res.status(400).json({ error: "Benutzername und Nachricht sind erforderlich" });
  }

  // Beispielhafte Speicherung des Tickets
  const newTicket = {
    userName,
    message,
    createdAt: new Date(),
  };

  res.status(201).json({ message: "Ticket erfolgreich erstellt", ticket: newTicket });
});

module.exports = router;