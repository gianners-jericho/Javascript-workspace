const express = require('express');
const session = require('express-session');

const app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: true
}))


const total_coupons = 10;

//FORM ROUTE
app.get("/", function(request, response) {

    //Start the count at 0
    if (!request.session.claimed) {
        request.session.claimed = 0;
    }

    response.render('index.ejs', {limit: total_coupons - request.session.claimed});
})

//CLAIM ROUTE
app.post("/claim", function(request, response) {

    //Claim again sends no name, so only save a name when one was typed
    if (request.body.name) {
        request.session.name = request.body.name;
    }

    //Start the count at 0
    if (!request.session.claimed) {
        request.session.claimed = 0;
    }

    //No coupons left
    if (request.session.claimed >= total_coupons) {
        response.render('coupon.ejs', {code: 0});
        return;
    }

    //Count this claim
    request.session.claimed = request.session.claimed + 1;

    const code = Math.floor(Math.random() * 9000000) + 1000000;

    response.render('coupon.ejs', {code: code});
})

//RESET ROUTE
app.get("/reset", function(request, response) {

    request.session.claimed = 0;

    response.redirect("/");
})

//SERVER PORT
app.listen(8000, function () {
    console.log("Listening to port 8000"); 
});
