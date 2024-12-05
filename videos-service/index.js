const express = require("express");
const cors = require('cors');
const mysql = require("mysql2/promise");


const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const con = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "mydatabase",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get("/", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM videos");
    res.json(rows);
  } catch (err) {
    console.error("Error querying videos:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 