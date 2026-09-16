require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');

const config = require('./config');
const routes = require('./routes/usersRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Scripts and stylesheets are served from the assets folder
app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded({extended: true}));

app.use(session(config.session));

//app.js does not know any route, it only loads routes.js
app.use('/', routes);

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}.`);
})
