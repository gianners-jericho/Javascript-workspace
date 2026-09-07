require('dotenv').config();

const express = require('express');
const session = require('express-session');
const ejs = require('ejs')
const routes = require('./routes')

const app = express();

app.set('view engine', 'ejs')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'strong secret'
}))

app.use('/', routes)

app.listen(3000, () => {
    console.log('Connected')
})

