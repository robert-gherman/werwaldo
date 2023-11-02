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
  client.query("SELECT * FROM waldo ORDER BY id", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
app.post("/addToLeaderboard", (req, res) => {
  const { username, profileImage, score } = req.body;

  const query =
    "INSERT INTO leaderboard (username, profile_image, score) VALUES ($1, $2, $3)";

  client.query(query, [username, profileImage, score], (err, result) => {
    if (!err) {
      res
        .status(200)
        .json({ message: "User data added to leaderboard successfully" });
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
