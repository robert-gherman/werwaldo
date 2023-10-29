const express = require("express");
const { Client } = require("pg");
const cors = require("cors");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "1234",
  database: "werwaldo",
});

client.connect();

const app = express();
app.use(cors());
app.get("/getWaldo", (req, res) => {
  client.query("SELECT * FROM waldo", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
