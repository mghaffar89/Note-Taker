//REFERENCE ACTIVITY 11.14 & 11.15

//Set up Dependencies
const path = require("path");
const express = require("express");
const fs = require(fs);

//set up port
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML GET Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

//API Routes
//GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", function (req, res) {
  res.json(db.json);
});

//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newNote = req.body;

  console.log(newNote);

  characters.push(newNote);

  res.json(newNote);
});

//listener will start the server
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
