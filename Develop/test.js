var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var Port = 3000;
app.use(express.static("public"));

app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});
app.get("/api/notes", function (req, res) {
  res.sendFile(__dirname + "/db/db.json");
});
app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/api/notes", function (req, res) {
  var newNote = {
    title: req.body.title,
    text: req.body.text,
  };
  var notes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
  newNote.id = notes.length;
  notes.push(newNote);

  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes));

  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  var noteId = req.params.id;
  console.log(noteId);

  var notes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
  notes = notes.filter(function (note, index) {
    if (noteId == index) {
      return false;
    }

    return true;
  });

  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes));

  res.json(notes);
});

app.listen(Port, function () {
  console.log("App listening on Port" + Port);
});
