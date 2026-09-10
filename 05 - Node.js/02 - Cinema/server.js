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

// Cinema

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

// Awards

const awards = [
    { name: "Award 1", date: "2026-01-01", awarded_by: "Karen", technologies: ["PHP", "Javascript", "Node"], icon: "🏆", url: "/awards/1"},
    { name: "Award 2", date: "2026-01-01", awarded_by: "Jerome", technologies: ["C++", "C#", "Node"], icon: "🥇", url: "/awards/2"},
    { name: "Award 3", date: "2026-01-01", awarded_by: "Paul", technologies: ["Java", "Ruby", "Node"], icon: "⭐", url: "/awards/3"},
]

app.get('/awards', (req, res) => {
    res.render('awards',  {awards: awards})
})


app.get('/awards/:number', (req, res) => {

    const award_id = req.params.number

    res.render('awards_details',  {award: awards[award_id - 1]})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
