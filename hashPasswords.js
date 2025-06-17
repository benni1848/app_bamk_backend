const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("./models/User"); // Ensureing Correct User Model Import

// MongoDB connection
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB verbunden!"))
.catch((err) => console.error("Fehler bei MongoDB-Verbindung:", err));

async function hashPasswords() {
  try {
    const users = await User.find({}); // All Users call

    for (let user of users) {
      if (!user.password.startsWith("$2b$")) { // Check If Password is hashed
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        await User.updateOne({ _id: user._id }, { password: hashedPassword });
        console.log(`Passwort für ${user.username} gehasht!`);
      } else {
        console.log(`Benutzer ${user.username} hat bereits ein gehashtes Passwort.`);
      }
    }

    console.log("Alle Passwörter wurden erfolgreich gehasht!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Fehler beim Hashen der Passwörter:", error);
  }
}

// Execution
hashPasswords();