const express = require("express");
const morgan = require("morgan");
const port = 1818;
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

function writeFile(filename, data, res) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      return res.send(err);
    }
    res.send('the number updated');
  })
}

const counter = "counter.json";
const fs = require("fs");
var sum = 0;

app.get("/", (req, res) => {
  fs.readFile("counter.json", "utf8", (err, data) => {
    var newData = {"count": isNaN(data)};
    newData.count = 1;
    if (err) {
      if (err.code === "ENOENT") {
        const jFile = JSON.stringify(newData);
        return writeFile(counter, jFile, res);
      }
    } else {
      fs.readFile("counter.json", "utf8", (err, data) => {
        sum++;
        var updated = JSON.parse(data);
        var adding = {"count" : updated.count + sum};
        const jsonFile = JSON.stringify(adding);
        return writeFile(counter, jsonFile, res);
      })
    }
    res.send(`Welcome to my site`);
  })
})

app.post("/reset", (req, res) => {
  fs.readFile("counter.json", "utf8", (err, data) => {
    var newData = {"count": isNaN(data)};
    newData.count = 0;
    if (err) {
      if (err.code === "ENOENT") {
        const jFile = JSON.stringify(newData);
        return writeFile(counter, jFile, res);
      }
    } else {
      const jsonParsing = JSON.parse(data);
      const convertToNumber = Number(jsonParsing.count);
      const resetToZero = {"count": convertToNumber - convertToNumber};
      const resetJsonFile = JSON.stringify(resetToZero);
      writeFile(counter, resetJsonFile, res);
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
