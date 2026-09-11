const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

PORT = 8000;

app.get("/", function(request, response) {
    response.render("index");
});

app.get("/movies", function(request, response) {
    response.render("movies")
});

app.get("/theaters", function(request, response) {
    response.render("theaters")
});

app.get("/movies/new", function(request, response) {
    response.render("forms")
});

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});