const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true })); // to parse the submitted data from req.body
app.use(session({
    secret: 'coupon-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    if(req.session.couponsLeft === undefined){
        req.session.couponsLeft = 10;
    }

    res.render('index', {
        couponsLeft: req.session.couponsLeft,
        claimedCoupon: req.session.claimedCoupon || null,
        showResult: req.session.showResult || false
    });
});

app.post('/claim', (req, res) => {
    if (req.session.couponsLeft >= 0){
        req.session.couponsLeft -= 1;
        req.session.claimedCoupon = Math.floor(1000000 + Math.random() * 9000000);
    }
    req.session.showResult = true;
    res.redirect('/');
});
app.post('/claim-again', function(req, res) {
    req.session.showResult = false; // Returns back to form view
    res.redirect('/');
});

app.post('/reset', function(req, res) {
    req.session.couponsLeft = 10;
    req.session.showResult = false;
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Feedback Form Server running on http://localhost:${PORT}`);
});

//time spent: 30mins