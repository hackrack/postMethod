const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const port = 1717;
const app = express();


app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.get("/number", (req, res) => {
  fs.readFile('numbers.json', 'utf8', (err, data) => {
      if (err) {
        return res.send(err);
      }
      res.send(`The number is: ${data}`);
  })
})

const fs = require("fs");
const numbers = "numbers.json";

function writeFile(filename, data, res) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      return res.send(err);
    }
    res.send('the number updated');
  })
}

app.post('/number', (req, res) => {
  console.log("req.body.number: " + req.body.number);
  if (!req.body.number) {
    return res.send('there is no number');
  }
  fs.readFile(numbers, 'utf8', (err, data) => {
    if (err) {
      // if the json file does not exist
      if (err.code === 'ENOENT') {
        console.log("req.body: " + req.body.number);
        var jFile = JSON.stringify(req.body);
        writeFile(numbers, jFile, res);
        console.log(req.body);
      } else {
        return res.send(err);
      }
    } else {
      writeFile(numbers, req.body.number, res);
    }
  })
})


app.listen(port, () => {
  console.log("Server is running on port " + port);
})
