const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

PORT = 8000;

app.get("/", function(request, response) {
    response.render("index");
});

app.get("/awards", function(request, response) {
    response.render("awards");
});

app.get("/awards/nobel-peace-prize", function(req, res) {
    const award = {
        name: "Nobel Peace Prize",
        image: "/images/nobel_peace_award.webp",
        description: "Awarded to individuals or organizations that have made an important contribution to peace.",
        winners: [
            "Martin Luther King Jr.",
            "Nelson Mandela",
            "Malala Yousafzai"
        ]
    };

    res.render("details", { award: award });
});

app.get("/awards/olympic-gold-medal", function(req, res) {
    const award = {
        name: "Olympic Gold Medal",
        image: "/images/olympic_gold.webp",
        description: "Awarded to athletes who finish first in their Olympic event.",
        winners: [
            "Michael Phelps",
            "Usain Bolt",
            "Simone Biles"
        ]
    };

    res.render("details", { award: award });
});

app.get("/awards/golden-globes", function(req, res) {
    const award = {
        name: "Golden Globes",
        image: "/images/golden_globes.webp",
        description: "Awards recognizing achievements in film and television.",
        winners: [
            "Leonardo DiCaprio",
            "Meryl Streep",
            "Tom Hanks"
        ]
    };

    res.render("details", { award: award });
});

app.listen(PORT, function(){
    console.log(`Server is running on port ${PORT} and live at http://localhost:${PORT}`);
});