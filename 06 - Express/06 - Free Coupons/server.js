const express = require("express");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(session({
    secret: "altitudeiq",
    resave: false,
    saveUninitialized: true
}));

const PORT = 8000;

app.get("/", function(req, res) {
    
    //For setting the number of chances to redeem coupon
    if (req.session.chances === undefined) {
        req.session.chances = 10;
    }

    // Tracks if a submission has been made
    if (req.session.submitted === undefined) {
        req.session.submitted = false;
    }

    res.render("index", {
        chances: req.session.chances,
        code: req.session.code,
        submitted: req.session.submitted
    });
});

app.post("/submit", function(req, res) {

    // For deducting number of redeems and generating 7 digit codes. Also keeps track if a submission has been made
    if (req.session.chances > 0) {
        req.session.chances--;
        req.session.code = Math.floor(Math.random() * 9000000) + 1000000;
        req.session.submitted = true;
    }

    res.redirect("/");
});

// For the redeem again button
app.post("/redeem-again", function(req, res) {

    // Sets the submission boolean back to false to be able to submit again
    req.session.submitted = false;

    // Clears the old code so that a new code can replace it
    req.session.code = "";

    res.redirect("/");
});


// For the reset button
app.post("/reset", function(req, res) {

    // Resetting everything back to default
    req.session.chances = 10;
    req.session.submitted = false;
    req.session.code = "";

    res.redirect("/");
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});