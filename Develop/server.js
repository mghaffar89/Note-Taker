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

app.use(express.static(path.join(__dirname, "./public")));

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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
  res.sendFile(path.join(_dirname, './db/db.json'))
});

//POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const addedNote = JSON.stringify(req.body);
  fs.readFile('./db/db.json', 'utf8', (err,data) => {
if (err) throw err; 

let dataArray = JSON.parse(data);
let lastNoteId = dataArray[dataArray.length - 1].id; 

if (lastNoteId === undefined) {
  lastNoteId = 0; 
}

let newId = lastNoteId - 1; 

addedNote = 
  }

  console.log(newNote);

  characters.push(newNote);

  res.json(newNote);
});

//listener will start the server
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
