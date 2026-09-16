require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('node:path');
const { createClient } = require('redis');
const { RedisStore } = require('connect-redis');

const routes = require('./routes');

const app = express();
const port = 3000;

// Redis Init
const redisClient = createClient({
  url: process.env.redis_string
}); 
redisClient.connect().catch(console.error);

const store = new RedisStore({
  client: redisClient,
  prefix: "redis07:"
});
  
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  store: store,
  resave: false,
  saveUninitialized: false,
  secret: 'a strong secret',
  cookie: {
    maxAge: 60000,
    sameSite: 'lax',
    secure: false
  } 
}));

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use('/', routes);

app.listen(port, function() {
  console.log(`Example MVC app listening on port ${port}`);
});