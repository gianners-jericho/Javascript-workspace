import 'dotenv/config'; // Loads .env variables
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to parse URL-encoded form data (req.body)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use feedback routes
app.use('/', feedbackRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));