import express from 'express';
import path from 'path';
import session from 'express-session';
import routes from './routes.js';
import { testConnection } from './config.js';
import Profiler from './classes/Profiler.js';

process.loadEnvFile();

const __dirname = import.meta.dirname;

const app = express();
const PORT = process.env.PORT || 8000;

//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//core middleware
app.use(express.urlencoded({ extended: true })); //populates req.body for form submissions
app.use(express.json()); //populates req.body for json payloads
app.use(express.static(path.join(__dirname, 'static')));

//session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'random_key_1234kldfaljfd32490j234jf',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
    })
);

//profiler middleware (must run after session/body parsers and before routes)
//we set up the middleware using app.use instead of adding it as an arg in routes so it is applied globally, and defined only once for DRY
app.use(Profiler.middleware());

//application routes
app.use('/', routes);

//404 catch-all handler
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested page does not exist. <a href="/">Return Home</a></p>');
});

//global error handler
app.use((err, req, res, next) => {
    console.error(`[Application Error]: ${err.stack || err}`);
    res.status(500).send('<h1>Internal Server Error</h1><p>An unexpected error occurred.</p>');
});

//start server after verifying database connection
async function startServer() {
    await testConnection();
    app.listen(PORT, () => {
        console.log(`[Server] Running on http://localhost:${PORT}`);
    });
}

startServer();
