const express = require("express");
const cors = require('cors');
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());
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
    const [rows] = await con.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    console.error("Error querying orders:", err);
    res.status(500).json({ error: JSON.stringify(err) });
  }
});

app.post('/', async (req, res) => {
  try {
    console.log(11111111111111);
    const { customer_name, address, mail, item } = req.body;

    // Validate input
    if (!customer_name || !address || !mail || !item) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Stringify the item
    const itemString = JSON.stringify(item);

    // Insert order data into the database
    const query = 'INSERT INTO orders (customer_name, address, mail, item) VALUES (?, ?, ?, ?)';
    const [result] = await con.execute(query, [customer_name, address, mail, itemString]);

    res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
