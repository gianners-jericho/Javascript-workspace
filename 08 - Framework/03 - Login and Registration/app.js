import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/studentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session & Flash Setup
app.use(session({
  secret: 'super_secret_login_key',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', studentRoutes);

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));