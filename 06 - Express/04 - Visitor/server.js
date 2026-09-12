const express = require('express');
const session = require('express-session');

const app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.use(session({
    secret: 'thisissecret',
    resave: false,
    saveUninitialized: true
}))

//ROOT ROUTE
app.get("/", function(request, response) {

    //check if first time
    if (!request.session.visits) {
        request.session.visits = 0;
    }

    //Increment
    request.session.visits = request.session.visits + 1;

    response.render('visitor.ejs', {visits: request.session.visits});
})

//RESET ROUTE
app.get("/reset", function(request, response) {

    request.session.visits = 0;

    response.redirect("/");
})

//REPEAT ROUTE
app.get("/repeat", function(request, response) {

    //check if first time
    if (!request.session.visits) {
        response.redirect("/");
        return;
    }

    //render without incrementing
    response.render('visitor.ejs', {visits: request.session.visits});
})

//SERVER PORT
app.listen(8000, function () {
    console.log("Listening to port 8000"); 
});
