const express = require('express');
const app = express();

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

//Reads the POST body from the form and puts it into request.body
app.use(express.urlencoded({
    extended: true
}));

const courses = ["JavaScript", "Java", "Python"];

//FORM ROUTE
app.get("/", function(request, response) {

    response.render('index.ejs', {courses: courses});
})

//RESULT ROUTE
app.post("/result", function(request, response) {

    let name = request.body.name;

    response.render('result.ejs', {
        name: name,
        course: request.body.course,
        score: request.body.score,
        reason: request.body.reason
    });
})

//RESULT ROUTE WITHOUT A POST
app.get("/result", function(request, response) {
    response.redirect("/");
})

//SERVER PORT
app.listen(8000, function () {
    console.log("Listening to port 8000"); 
});
