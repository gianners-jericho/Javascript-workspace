const express = require('express');
const session = require('express-session');
const path = require('node:path');

const app = express();
const port = 3000;

// Static Files

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: 'a strong secret'
}))

app.use(express.urlencoded({ extended: true }));

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
