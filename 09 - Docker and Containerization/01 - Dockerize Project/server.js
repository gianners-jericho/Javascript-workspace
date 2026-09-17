var express = require("express");
var app = express();
var port = 4000;

app.get('/', function(request, response) {
   response.send("<h1>My Awesome Project</h1>");
})

app.listen(port, function() {
   console.log("listening on port", port)
});