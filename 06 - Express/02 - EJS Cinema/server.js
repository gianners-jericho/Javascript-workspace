const express = require('express');
const path = require('node:path');

const app = express();
const port = 3000;

// Static Files

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/movies', (req, res) => {
    const movies = [
        { title: "Avengers", genre: "Sci-Fi", year: "2012", img: "/images/movies/avengers.jpeg"},
        { title: "Batman", genre: "Action", year: "2025", img: "/images/movies/batman.png"},
        { title: "Silence of the Lambs", genre: "Thriller", year: "2014", img: "/images/movies/silence_of_the_lambs.jpg"},
    ]

    res.render('movies', {movies: movies})
})

app.get('/movies/new', (req, res) => {
    res.render('form')
})

app.get('/theaters', (req, res) => {

    const theaters = [
        { title: "Theater 1", location: "Manila", year: "2012", img: "/images/theaters/theater_1.jpg"},
        { title: "Theater 2", location: "Quezon City", year: "2025", img: "/images/theaters/theater_2.jpg"},
        { title: "Theater 3", location: "Ortigas", year: "2014", img: "/images/theaters/theater_3.jpg"},
    ]

    res.render('theaters',  {theaters: theaters})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
