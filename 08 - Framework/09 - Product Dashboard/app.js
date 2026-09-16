require('dotenv').config()

const express = require('express');
const session = require('express-session');
const path = require('node:path');
const router = require('./routes');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

const app = express();

// Redis Init
const redisClient = createClient({
  url: process.env.redis_string
}) ;
redisClient.connect().catch(console.error);

const store = new RedisStore({
  client: redisClient,
  prefix: "redis07:"
});

app.use(session({
    store: store,
    secret: "strong secret",
    saveUninitialized: false,
    resave: false
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', router)

app.listen(3000, function() {
    console.log("Product dashboard listening on Port 3000.")
})