require('dotenv').config();

const express = require('express');
const path = require('path');

const config = require('./config');
const routes = require('./routes/playersRoute');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', routes);

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}.`);
})
