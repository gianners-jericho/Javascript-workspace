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

// Routes
app.get('/', (req, res) => {
    const session = req.session;
    const skip = session.skipIncrement
    
    if(session.skipIncrement){
        session.skipIncrement = false;
    }
    else {
        session.count ? session.count++ : session.count = 1; 
    }

    res.render('visitor', {
        count: session.count,
        quote: session.count % 2 == 0 ? "Even flowers need rain." : "Beat the odds.",
        skipped: skip
    });
});

app.get('/reset', (req, res) => {
    req.session.count = 0;
    res.redirect('/');
})

app.get('/repeat', (req, res) => {
    req.session.skipIncrement = true;
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
