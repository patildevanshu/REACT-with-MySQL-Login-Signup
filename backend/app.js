const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "devanshu",
  database: "user_management",
});

app.post("/signup", async (req, res) => {
  const query =
    "INSERT INTO users (userid,name,email,roles,password) VALUES (?)";

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password[0], salt);

  const Values = [
    uuidv4(),
    req.body.name,
    req.body.email,
    req.body.roles,
    hashedPassword,
  ];

  db.query(query, [Values], (err, result) => {
    if (err) {
      return res.json(err);
    }
    return res.json("success");
  });
});

app.post("/login", async (req, res) => {
  const query = "SELECT * FROM users WHERE `email` = ?";
  const salt = await bcrypt.genSalt(10);
  db.query(query, [req.body.email], (err, result) => {
    if (result.length > 0) {
      if (bcrypt.compare(req.body.password[0], result[0].password)) {
        if (err) {
          return res.json(err);
        }
        if (result.length > 0) {
          return res.json(result[0].roles);
        }
      } else {
        return res.json("Invalid credentials");
      }
    }else {
        return res.json("Invalid credentials");
      }
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
