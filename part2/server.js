var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require("path");
var fs = require('fs');


//Challenge 1:
// Create a POST route
// for "/create/:name/:age"
// that creates an object that looks like this: {
//   "name": "troy",
//   "age": 21
// }
// Then take that object and insert it into storage.json

  app.post('/create/:name/:age', function (req, res) {
    let storage = JSON.parse(fs.readFileSync(__dirname + '/storage.json', 'utf8'))
    //console.log(fs.readFileSync(__dirname + './part2/storage.json', 'utf8'))
    let obj = {
      name: req.params.name,
      age: parseInt(req.params.age)
    }
    storage.push(obj)
    fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(storage));
    res.send(storage)
  })

//Challenge 2:
// Create a Get route
// for "/"
// that returns all of the objects inside storage.json.

app.get('/', function (req, res) {
  fs.readFile("./part2/storage.json", "utf8", function (err, data) {
    res.json(JSON.parse(data))
  })
});

// Challenge 3:
//   Create a Get route
// for "/:name"
// that returns the first object in storage.json that matches the name.If there is no object in storage.json that matches then
// return a 400 status.

app.get("/:name", function (req, res) {
  fs.readFile("./part2/storage.json", "utf8", function (err, data) {
    let users = JSON.parse(data)
    console.log(users)
    for (let i = 0; i < users.length; i++){
      if (users[i].name = req.params.name){
        res.send(users[i])
      } else {
        res.sendStatus(400);
      }
    }
  })
})
  

// Challenge 4(stretch):
//   Modify your logic so every object has and id field that automatically goes up by one
// for every object inserted(first object has an id of 1, second object has an id of 2 ect).Then modify challenge 3 so that it finds the object by an id instead of by name.

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
