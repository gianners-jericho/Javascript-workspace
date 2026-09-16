const express = require('express');
const path = require('node:path');

const app = express();
const port = 3000;

// Static Files

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/results', (req, res) => {
    res.render('results', req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
