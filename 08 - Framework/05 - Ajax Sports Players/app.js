require('dotenv').config();

const express = require('express');
const path = require('node:path');
const routes = require('./routes');

const app = express();
const port = 3000;
  
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/home', function(req, res){
  res.render('home');
})

app.get('/', function(req, res) {
  res.redirect('/home')
});

app.use('/', routes);

app.listen(port, function() {
  console.log(`Example MVC app listening on port ${port}`);
});