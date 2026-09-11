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
    secret: 'strong'
}))

app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', function(req, res){
    if(req.session.redemptions == null){
        req.session.redemptions = 10;
    };

    res.render('index');
});

app.get('/reset', function(req, res){
    req.session.redemptions = null;
    req.session.awardees = null;
    res.redirect('/')
})

app.post('/ticket', function(req, res){
    const { session } = req;
    const { name } = req.body;

    // No redemption session
    if (session.redemptions === undefined) {
        console.log('Skipped form. Redirecting back...');
        return res.redirect('/');
    }

    // No redemptions remaining
    if (session.redemptions <= 0) {
        console.log('No more redemptions...');
        return res.render('sorry');
    }

    // Initialize awardees if needed
    session.awardees ??= [];

    // Prevent duplicate claims
    if (session.awardees.includes(name)) {
        console.log('Name already claimed...');
        return res.render('sorry');
    }

    // Process redemption
    session.awardees.push(name);
    session.redemptions--;

    const number = Math.floor(1_000_000 + Math.random() * 9_000_000);

    console.log(session);

    res.render('ticket', {
        name,
        number
    });
});

app.listen(port, function(){
    console.log(`Example app listening on port ${port}`);
});
