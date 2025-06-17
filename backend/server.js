const express = require("express");
const cors = require("cors");
const db = require("./config/db");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

db.raw("SELECT 1")
  .then(() => {
    console.log("Database connected");
    // Jalankan server hanya jika koneksi DB berhasil
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Kasir Backend API is running 🚀");
});

