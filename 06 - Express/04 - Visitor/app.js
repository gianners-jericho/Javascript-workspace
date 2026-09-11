const express = require('express');
const session = require('express-session');
const path = require('node:path');

const app = express();
const PORT = 8000;

const quotes = [
    "He who sleeps with itchy bum, wake up with smelly finger",
    "To Infinity and Beyond",
    "Code is like humor. When you have to explain it, it's bad",
    "Would you rather be a smart fella or a fart smella"
]

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/styles", express.static(path.join(__dirname, "styles")));

app.use(session({
    secret: process.env.secret || "fallbackstring_31231io2fn41oiufn1oi3u24h132",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //24 hours
    }

}));

app.get("/", function(request, response){
    if(request.session.isRepeat){
        request.session.isRepeat = false;
    } else{
        if (request.session.visitorCount){
            request.session.visitorCount += 1;
        } else {
            request.session.visitorCount = 1;
        }

        const randomIndex = Math.floor(quotes.length * Math.random());
        request.session.currentQuote = quotes[randomIndex];
    } 
    response.render("index", {
        visitorCount: request.session.visitorCount,
        quote: request.session.currentQuote
    });
});

app.get("/reset", function(request, response) {
    request.session.visitorCount = 1;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    request.session.currentQuote = quotes[randomIndex];

    request.session.isRepeat = true;

    response.redirect("/");
});

app.get("/repeat", function(request, response){
    request.session.isRepeat = true;

    response.redirect("/");
});

app.listen(PORT, function(){
    console.log(`Server listening on http://localhost:${PORT}`);
})