const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 1950;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"));


var rockPaperScissors = ["rock", "paper", "scissors"];
app.get("/", (req, res) => {
  res.send(`please type your name and choose rock, paper or scissors on localhost port ${port}/`);
})

var lose = 0;
var tie = 0;
var win = 0;

function writeFile(filename, data, res) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      return res.send(err);
    }
    res.send('the number updated');
  })
}

const fs = require("fs");

const scoresJSON = "scores.json";

app.get("/:name/:move", (req, res) => {
  var move = req.params.move;
  var ai = rockPaperScissors[Math.floor(Math.random() * 3)];
  var rpsObj = {user: move, ai: ai, result: ""}
  if (move === "rock" && ai === "rock") {
    rpsObj.result = "tie";
    tie++;
  } else if (move === "rock" && ai === "paper") {
    rpsObj.result = "lose";
    lose++;
  } else if (move === "rock" && ai === "scissors") {
    rpsObj.result = "win";
    win++
  } else if (move === "paper" && ai === "paper") {
    rpsObj.result = "tie";
    tie++;
  } else if (move === "paper" && ai === "scissors") {
    rpsObj.result = "lose";
    lose++;
  } else if (move === "paper" && ai === "rock") {
    rpsObj.result = "win";
    win++;
  } else if (move === "scissors" && ai === "rock") {
    rpsObj.result = "lose";
    lose++;
  } else if (move === "scissors" && ai === "paper") {
    rpsObj.result = "win";
    win++;
  } else if (move === "scissors" && ai === "scissors") {
    rpsObj.result = "tie";
    tie++;
  }
  var name = req.params.name;
  var scores = {user: name, lose: lose, tie: tie, win: win};
  res.send(JSON.stringify(rpsObj) + " " + JSON.stringify(scores));
})



// app.post(`/cheat`, (req, res) => {
//
// })

app.listen(port, () => {
  console.log("server is running...");
})
