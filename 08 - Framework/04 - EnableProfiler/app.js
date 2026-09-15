require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('node:path');
const routes = require('./routes');
const profiler = require('./middlewares/profiler.middleware').profiler;

const app = express();
const port = 3000;
  
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'a strong secret',
}));
app.use(profiler);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use('/', routes);


app.listen(port, function() {
  console.log(`Example MVC app listening on port ${port}`);
});