import express from 'express';
import session from 'express-session';
import routes from './routes.js';
import {fileURLToPath} from 'url';
import path from 'path';
import {testConnection} from './config.js';

process.loadEnvFile();

const __dirname = import.meta.dirname;

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'random_key_1234kldfaljfd32490j234jf',
        resave: false,
        saveUninitialized: false, //dont save empty/unmodified new sessions
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
    res.status(404).send("<h1>Page not found</h1>")
})

//handles errors and code that breaks
//4 params - next(error) searches through these 4 param middlewares sequentially
app.use((err, req, res, next) => {
    console.error(`Internal server error: ${err}`);
    res.status(500).send("<h1>Internal Server Error</h1>")
})

async function startServer(){
    await testConnection();
    app.listen(PORT, ()=> {
        console.log(`SERVER LISTENING ON PORT: ${PORT}`);
    })
}

startServer()