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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
  const { userName, profileImage, score } = req.body;

  const query =
    "INSERT INTO leaderboard (username, profile_img, score) VALUES ($1, $2, $3) ON CONFLICT (username) DO UPDATE SET score = EXCLUDED.score WHERE EXCLUDED.score > leaderboard.score RETURNING *";

  client.query(query, [userName, profileImage, score], (err, result) => {
    if (!err) {
      if (result.rows.length > 0) {
        res.status(200).json({
          message: "User data added/updated in leaderboard successfully",
        });
      } else {
        res.status(200).json({
          message: "User data not updated in leaderboard (score is not higher)",
        });
      }
    } else {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
app.get("/getLeaderboard", (req, res) => {
  const query = "SELECT username, score FROM leaderboard ORDER BY score DESC";

  client.query(query, (err, result) => {
    if (!err) {
      const leaderboardData = result.rows;
      res.status(200).json(leaderboardData);
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
