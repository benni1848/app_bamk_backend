const express = require("express");
const router = express.Router();
const Tickets = require("../models/Tickets");

router.post("/", async (req, res) => {
  const { userName, message } = req.body;

  console.log("POST /tickets empfangen");
  console.log("userName:", userName);
  console.log("message:", message);

  if (!userName || !message) {
    console.warn("Ungültige Anfrage: userName oder message fehlt");
    return res.status(400).json({ error: "Benutzername und Nachricht sind erforderlich" });
  }

  try {
    const newTicket = new Tickets({ userName, message });
    await newTicket.save();

    console.log("Ticket gespeichert:", newTicket);
    res.status(201).json({ message: "Ticket erfolgreich erstellt", ticket: newTicket });
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
    res.status(500).json({ error: "Speichern in der Datenbank fehlgeschlagen" });
  }
});

module.exports = router;