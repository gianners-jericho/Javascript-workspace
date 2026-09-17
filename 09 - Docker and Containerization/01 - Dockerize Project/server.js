var express = require("express");
var app = express();

app.get('/', function(request, response) {
   response.send("<h1>My Awesome Project</h1>");
})

app.listen(8080, function() {});


// 1. Changed the port number from 4000 to 8080
// 2. Added a start a command in the package.json to initiate the server
// 3. Changed the main variable of the package.json to server.js
// 4. Set up Dockerfile