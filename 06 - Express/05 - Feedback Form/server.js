const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

PORT = 8000;

// Array to store all the feedback for the course 
const feedback = [];

// Just to render the main page with the form
app.get("/", function(request, response) {
    response.render("index");
});


// On submit, push all responses to the feedback array
app.post("/submit", function(request, response) {
    
    // Since name is optional, if left blank default to Anonymous
    if (request.body.name === "") {
        request.body.name = "Anonymous";
    }

    // Push all data to feedback
    feedback.push(request.body);

    // Redirect to the results page 
    response.redirect("/result")
});

app.get("/result", function(request, response) {
    // To render all the responses on the result page
    response.render("result", {
        feedback: feedback
    });
});

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});