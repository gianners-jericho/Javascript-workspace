//import required modules
import express from 'express';
import path from 'path';
import routes from './routes.js';
import { testConnection } from './config.js';

//load environment variables
process.loadEnvFile();

//create directory path for esm
const __dirname = import.meta.dirname;

//initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

//view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

//mount application routes
app.use('/', routes);

//error handler middleware for 404
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested page does not exist. <a href="/">Return Home</a></p>');
});

//global error handler middleware
app.use((err, req, res, next) => {
    console.error('[Application Error]:', err.stack || err);
    res.status(500).send('<h1>500 Internal Server Error</h1><p>An unexpected error occurred.</p>');
});

//start server after verifying database connection
async function startServer() {
    await testConnection();
    app.listen(PORT, () => {
        console.log(`[Server] listening on http://localhost:${PORT}`);
    });
}

startServer();
