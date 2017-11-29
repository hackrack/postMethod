const express = require("express");
const morgan = require("morgan");
const port = 1919;
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  // res.send("hello");
})
const fs = require("fs");
const users = "users.json";
app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.send("Please type your username and password");
  }
  fs.readFile(users, "utf8", (err, data) => {
    if (err) {
      return res.send(err);
    }
    var jsonParsing = JSON.parse(data);
    for (var i = 0; i < jsonParsing.length; i++) {
      if (jsonParsing[i].username === req.body.username && jsonParsing[i].password === req.body.password) {
        return res.send("you are in!!!");
      }
    }
    res.send("invalid username/password");
  })
})

app.listen(port, () => {
  console.log("Server is running...");
})
