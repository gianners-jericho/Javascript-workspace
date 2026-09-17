import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import session from 'express-session';

process.loadEnvFile();

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true})); //populates req.body for form submissions
app.use(express.json()); //populates req.body for requests with json payloads
app.use(express.static(path.join(__dirname, 'static')));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'random_key_1234kldfaljfd32490j234jf',
        resave: false,
        saveUninitialized: false, //dont save empty/unmodified new sessions (guests)
        cookie: {
            httpOnly: true, //xss defense
            maxAge: 1000 * 60 * 60,
        }
    })
)

//mount routes
app.use('/', routes);

//if a request reachers here, then it didn't pass the routes so must be a 404
//express calls next() under the hood when routes don't match, even if not explicitly called in the code.
//2-3 param middlewares are regular middlewares, next() traverses the routes sequentially first then reaches this 404 catch-all handler when no matches are found
app.use((req, res) => { 
  res.status(404).send('<h1>404 Not Found</h1><p>The requested page does not exist. <a href="/">Return Home</a></p>');
});

//handles errors and code that breaks
//4 params - next(error) searches through these 4 param middlewares sequentially
app.use(function(err, req, res, next){
    console.error(`APP ERROR: ${err}`);
    res.status(500).send('<h1>Internal Server Error</h1>')
})

async function startServer(){
    await testConnection();
    app.listen(PORT, function(){console.log(`LISTENING ON PORT ${PORT}`)})
}

startServer();
