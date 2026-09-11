const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 8000;

//environment config
app.set("view engine", 'ejs');
app.set('views', path.join(__dirname, "views"));

//middlewares
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({extended: true}));

const awards = [
    {
        title: "Oscar",
        organization: "AMPAS",
        description: "Award given to only the best actor of the year 2026",
        year: "2026",
        image_url: '/images/oscar.jpg',
        highlights: ["Best Picture Nominee", "Best Actor in a Leading Role", "Record-Breaking 11 Nominations"]
    },
    {
        title: "Grammy",
        organization: "The Recording Academy",
        description: "Award given to the top music artist of 2026",
        year: "2026",
        image_url: '/images/grammy.jpg',
        highlights: ["Album of the Year", "Song of the Year", "Best New Global Artist"]
    },
    {
        title: "Turing Award",
        organization: "ACM",
        description: "Recognized for advancing the field of Computer Science",
        year: '2026',
        image_url: '/images/turing.jpg',
        highlights: ["Foundations of Deep Learning", "Novel Distributed Systems Architecture", "ACM Fellow Recognition"]
    }
]

app.get(["/", "/awards"], function(request, response){
    response.render("awards", {awards}); //response.render arg 2 expects an object always
});

app.get("/awards/oscar", function(request, response){
    response.render("details", awards[0]);
})

app.get("/awards/grammy", function(request, response){
    response.render("details", awards[1]);
})

app.get("/awards/turing", function(request, response){
    response.render("details", awards[2]);
})

app.listen(PORT, function(){console.log(`Listening on port: ${PORT}`)});
