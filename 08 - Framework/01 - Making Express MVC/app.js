import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes.js';
import { testConnection } from './config.js';

dotenv.config();

//create our own __dirname since it doesn't exist in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
  res.status(500).send('<h1>500 Internal Server Error</h1><p>An unexpected error occurred. Please try again later.</p>');
});

//start server after verifying database connection
async function startServer() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`[Server] Express app running in ESM mode on http://localhost:${PORT}`);
  });
}

startServer();