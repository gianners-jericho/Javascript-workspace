const express = require("express");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(session({
    secret: 'altitudeiq',
    resave: false,
    saveUninitialized: true,
}));

PORT = 8000;

app.get("/", function(request, response) {

    // Checks if we should skip incrementing views 
    if (!request.session.skipIncrement) {
        // Checks if there is a views variable beforehand
        if (request.session.views){
            // Adds one if the views variable already exists
           request.session.views++; 
        } else {
            // Sets the value of the views variable to 1 if it did not exist before
            request.session.views = 1;
        }

        // For setting the quote for every odd number
        if (request.session.views % 2 !==0) {
            request.session.quote = "Beat the odds";
        } else {
            request.session.quote = "";
        }
    }
    
    // Setting this to false so that if skipIncrement is not updated to true, increment views
    request.session.skipIncrement = false;
    
    // Rendering the page along with the value of views and quotes
    response.render("index", {
        views: request.session.views,
        quote: request.session.quote 
    });
});

// For the reset button
app.post("/reset", function(request, response) {

    // Resets views back to 0
    request.session.views = 0;

    // The redirect increments views back to 1 
    response.redirect("/");
});

app.post("/repeat", function(request, response) {
    // Updates the skipIncrement value so that we do not increment views
    request.session.skipIncrement = true;
    
    // The redirect does not increment views because skipIncrement is still true at this point 
    response.redirect("/")
});

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});