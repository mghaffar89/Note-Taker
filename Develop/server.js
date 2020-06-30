//REFERENCE ACTIVITY 11.14 & 11.15

//Set up Dependencies
const path = require("path");
const express = require("express");
const fs = require("fs");

//set up port
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname, "public"));

//HTML GET Routes

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//API Routes

let notesData = [];

//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = {
    title: req.body.title,
    text: req.body.text,
  };

  const notes = JSON.parse(fs.readFileSync(__dirname + "./db/db.json"));
  notes.push(newNote);

  fs.writeFileSync(__dirname + "./db/db.json", JSON.stringify(notes));

  res.json(notes);
});

app.delete("/api/notes/:id", function (req, res) {
  const noteId = req.params.id;

  let notes = JSON.parse(fs.readFileSync(__dirname + "./db/db.json"));
  notes = notes.filter(function (note, index) {
    if (noteId == index) {
      return false;
    }

    return true;
  });

  fs.writeFileSync(__dirname + "./db/db.json", JSON.stringify(notes));

  res.json(notes);
});

//listener will start the server
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
