require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');

const config = require('./config');
const routes = require('./routes/usersRoute');
const profiler = require('./middleware/profiler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: true}));
app.use(session(config.session));

//The profiler runs before every route, so any controller is covered
app.use(profiler);

app.use('/', routes);

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}.`);
})
