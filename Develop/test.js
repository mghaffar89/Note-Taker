//REFERENCE ACTIVITY 11.14 & 11.15

//Set up Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var Port = process.env.PORT || 3000;

//HTML GET ROUTES
app.get("/notes", function (req, res) {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

//API GET - Should read the `db.json` file and return all saved notes as JSON.

app.get("/api/notes", function (req, res) {
  res.sendFile(__dirname + "/db/db.json");
});

//API POST -Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

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

//listner will start the server
app.listen(Port, function () {
  console.log("App listening on: http://localhost:" + PORT);
});
