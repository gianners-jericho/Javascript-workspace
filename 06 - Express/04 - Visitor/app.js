const express = require('express');
const session = require('express-session');
const path = require('path');


const app = express();
const PORT = 8000;

// Configure session middleware
app.use(session({
    secret: 'secret-key-visitor', // Used to sign the session ID cookie
    resave: false,                       // Prevents saving session if unmodified
    saveUninitialized: true             // Saves new but unmodified sessions
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    req.session.count = (req.session.count || 0) + 1;

    const quote = (req.session.count % 2 !== 0) 
        ? '"Beat the odds"' 
        : '"Even flowers need rain"';

    res.render('index', { 
        count: req.session.count, 
        quote: quote 
    });
});

app.post('/reset', (req, res) => {
    req.session.count = 0;
    res.redirect('/');
});

app.post('/repeat', (req, res) => {
    req.session.count -= 1;
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`EJS Awards server running on http://localhost:${PORT}`);
});

//time spent: 15mins