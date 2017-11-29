const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()


app.use(logger('dev'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   fs.readFile('moods.json', 'utf8', (err, data) => {
//       if (err){
//         return res.send(err)
//       }
//       console.log(JSON.parse(data))
//       res.send(data)
//   })
// })
//
// const fs = require('fs')
//
// const moodsFile = "moods.json"
//
// const writeFile = (filename, data, res) => {
//   fs.writeFile(filename, data, (err) => {
//     if (err) {
//       return res.send(err)
//     }
//     res.send('success')
//   })
// }
//
// app.post('/moods', function (req, res) {
//   if (!req.body.name || !req.body.mood) {
//     return res.send('please specify a name and mood');
//   }
//
//
//   fs.readFile(moodsFile, 'utf8', (err, data) => {
//     if (err) {
//       // if the json file does not exist
//       if (err.code === 'ENOENT') {
//         // creating a new arary
//         const arr = [req.body]
//         // converting array to json
//         const jsonArr = JSON.stringify(arr)
//         // writing to file
//         return writeFile(moodsFile, jsonArr, res)
//       } else {
//         return res.send(err)
//       }
//     }
//
//     // parsing json file to javascript array
//     const arr = JSON.parse(data)
//     // adding request body to the array
//     arr.push(req.body)
//     // converting back to JSON
//     const jsonArr = JSON.stringify(arr)
//     // saving to file
//     return writeFile(moodsFile, jsonArr, res)
//   })
// })
app.get("/", (req, res) => {
  res.send("I am here");
})

app.post('/moods', (req, res) => {
  console.log(req.body);
  res.json(req.body)
})


const port = 4000;
app.listen(port, () => {
  console.log(`listening to port ${port}`)
})
