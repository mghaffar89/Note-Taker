var http = require("http");
var PORT = 8080;
var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
