const express = require('express');
const path = require('node:path');

const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))


app.use(express.urlencoded({extended: true}));
app.use("/styles", express.static(path.join(__dirname, "styles")));

app.get(["/","/index"], function(request, response){
    response.render('index')
});

app.post('/index/submit', function(request, response){
    const {name, course_title, score, reason} = request.body;

    response.render("result", {name, course_title, score, reason});
})

app.listen(PORT, function(){
    console.log(`LISTENING ON PORT ${PORT}`);
})


