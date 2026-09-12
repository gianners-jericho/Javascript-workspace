const express = require('express');
const app = express();

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

const awards_arr = [
    {
        name: "AWS Academy Graduate - Cloud Foundations - Training Badge",
        date: "May 03, 2025",
        awarded_by: "Amazon Web Services Training and Certification",
        skills: ["AWS Architecture", "AWS Cloud", "AWS Core Services", "AWS Pricing", "AWS Support"],
        image: 1
    },
    {
        name: "AWS Educate Web Builder - Training Badge",
        date: "April 27, 2025",
        awarded_by: "Amazon Web Services Training and Certification",
        skills: ["Amazon Web Services (AWS)", "Architecting Solutions On AWS", "AWS Cloud", "AWS Cloud Building", "Infrastructure On AWS", "Web Applications"],
        image: 2
    },
    {
        name: "AWS Cloud Quest: Cloud Practitioner - Training Badge",
        date: "March 22, 2025",
        awarded_by: "Amazon Web Services Training and Certification",
        skills: ["Amazon Web Services (AWS)", "AWS", "AWS Cloud", "AWS Cloud Computing", "AWS Cloud Foundations", "Cloud Platform"],
        image: 3
    }
];

//AWARDS ROUTE
app.get("/awards", function(request, response) {

    response.render('awards', {awards: awards_arr});
})

// AWARD DETAILS PAGE ROUTE
app.get("/awards/cloud-foundations", function (request, response) {
    response.render('details.ejs', {award: awards_arr[0] });
})
app.get("/awards/web-builder", function (request, response) {
    response.render('details.ejs', {award: awards_arr[1] });
})
app.get("/awards/cloud-quest", function (request, response) {
    response.render('details.ejs', {award: awards_arr[2] });
})

//SERVER PORT
app.listen(8000, function () {
    console.log("Listening to port 8000"); 
});
