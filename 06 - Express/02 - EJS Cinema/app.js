const express = require('express');
const path = require('node:path');

const app = express();

const PORT = 8000;

//FOR EJS COMPATIBILITY (setting application environment, not equivalent to system-level environments like env files)

//set view engine as ejs (tells express what file extension to expect and which template library to use for parsing)
app.set("view engine", "ejs");
//set views to current_path/views for response.render() method
app.set("views", path.join(__dirname, "views")); 

//GLOBAL MIDDLEWARES

//global middleware to parse FORM submissions (must always be at the top)
app.use(express.urlencoded({ extended: true }));
//global middleware to set routes for static files to serve them (saves us from writing app.get routes for every image or handling every image route in createServer callback in pure node)
app.use(express.static(path.join(__dirname, "public")));

/*other middleware options:

parse incoming JSON
app.use(express.json());
*/

//SERVE HTML FILES THROUGH EJS
app.get("/movies", function(request, response){
    response.render("movies") //render is required instead of sendFile for ejs (no need for file extension since we set it in the view engine)
})
app.get("/movies/new", function(request, response){
    response.render("movie_form") 
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
