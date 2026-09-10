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
