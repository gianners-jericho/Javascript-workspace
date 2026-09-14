const express = require('express');
const session = require('express-session');
const path = require('node:path');

const app = express();
const PORT = 8000;
const STARTING_COUPONS = 10;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.use(session({
    secret: process.env.secret || "fallbackstring_31231io2fn41oiufn1oi3u24h132",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

//helper functions
const clearClaimState = (session) => {
    session.claimed = false;
    session.customerName = null;
    session.ticketNumber = null;
};

const generateTicketNumber = () => Math.floor(1000000 + Math.random() * 9000000);

// Global session initialization middleware
app.use((req, res, next) => {
    if (req.session.remainingCoupons === undefined) {
        req.session.remainingCoupons = STARTING_COUPONS;
        clearClaimState(req.session);
    }
    next();
});

//root route
app.get('/', (req, res) => {
    const { remainingCoupons, claimed, customerName, ticketNumber } = req.session;
    res.render('index', {
        remainingCoupons,
        claimed,
        customerName,
        ticketNumber
    });
});

//process claim form submission
app.post('/claim', (req, res) => {
    const name = req.body.name?.trim() || 'Customer';

    if (req.session.remainingCoupons > 0) {
        req.session.remainingCoupons -= 1;
        req.session.claimed = true;
        req.session.customerName = name;
        req.session.ticketNumber = generateTicketNumber();
    }

    res.redirect('/');
});

//allow claiming of another coupon while preserving current count
app.get('/next', (req, res) => {
    clearClaimState(req.session);
    res.redirect('/');
});

//reset remaining coupons
app.get('/reset', (req, res) => {
    req.session.remainingCoupons = STARTING_COUPONS;
    clearClaimState(req.session);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

