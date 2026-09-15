import express from 'express';
import { renderAuthForm, register, login, renderProfile, logout } from '../controllers/studentsController.js';
import { isAuth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', renderAuthForm);
router.post('/register', register);
router.post('/login', login);
router.get('/students/profile', isAuth, renderProfile);
router.get('/logout', logout);

export default router;