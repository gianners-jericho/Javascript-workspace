const express = require('express');
const path = require('path');

const app = express();
const PORT = 8000;

// Set up EJS view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (index.html, CSS, images) from static directory
app.use(express.static(path.join(__dirname, 'static')));

// Dynamic data array
const moviesList = [
    {
        title: "A Silent Voice",
        category: "Anime / Drama",
        description: "Emotional Masterpiece",
        image: "/images/silent_voice.jpg"
    },
    {
        title: "Avengers: Endgame",
        category: "Action / Sci-Fi",
        description: "Marvel Cinematic Event",
        image: "/images/endgame.jpg"
    },
    {
        title: "Demon Slayer: Infinity Castle Arc 1",
        category: "Anime / Action",
        description: "Peak Animation & Heartbreak",
        image: "/images/demon_slayer.jpg"
    },
    {
        title: "Spiderman: Across the Spiderverse",
        category: "Animation / Action",
        description: "Miles Morales across the Spiderverse",
        image: "/images/spiderman_across.jpg"
    },
    {
        title: "The Intern",
        category: "Comedy / Drama",
        description: "Starring Robert De Niro",
        image: "/images/the_intern.jpg"
    }
];

// EJS Routes
app.get('/movies', (req, res) => {
    res.render('movies', {movies : moviesList});
});

app.get('/theaters', (req, res) => {
    res.render('theaters');
});

app.get('/movies/new', (req, res) => {
    res.render('new'); // Renders views/new.ejs (or views/form.ejs if you named it form.ejs)
});

app.listen(PORT, () => {
    console.log(`EJS Cinema server running on http://localhost:${PORT}`);
});

//time spent: 20mins