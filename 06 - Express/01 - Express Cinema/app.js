const express = require('express');
const path = require('node:path');

const app = express();

const PORT = 8000;

//global middleware to parse FORM submissions (must always be at the top)
app.use(express.urlencoded({ extended: true }));

/*other middleware options:

parse incoming JSON
app.use(express.json());

global middleware to set routes for static files to serve them (saves us from writing app.get routes for every image or handling every image route in createServer callback in pure node)
app.use(express.static(path.join(__dirname, "public")));
*/

//SERVE HTML FILES
app.get("/movies", function(request, response){
    response.sendFile(path.join(__dirname, "views", "movies.html")) //sendFile requires absolute paths no './views/movies.html and etc
})
app.get("/movies/new", function(request, response){
    response.sendFile(path.join(__dirname, "views", "movie_form.html"))
})

//HANDLE FORM SUBMIT

app.post("/movies/new", function(request, response){

    //parse form data
    const { title, director } = request.body;

    //DB query logic here

    //redirects browser to /movies endpoint/url and fires GET request
    response.redirect("/movies")
})

app.listen(PORT, function(){
    console.log(`Server listening on port: ${PORT}`)
})
    