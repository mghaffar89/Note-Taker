//Set up Dependencies
var path = require("path");
var express = require("express");

//set up port
var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML GET Routes
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

//listener will start the server
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
