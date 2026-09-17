import {Router} from 'express';
import {UserController} from './controllers/userController.js';
import {requireAuth} from './middleware/authMiddleware.js';

const router = Router();


router.get(['/', '/home', '/students/profile'], requireAuth, UserController.renderHome);

//don't authenticate users logging in or registering
router.get('/login', UserController.renderLoginForm);
router.get('/register', UserController.renderRegisterForm);

//form submissions
router.post('/register-submit', UserController.handleRegister); //don't authenticate registering users
router.post('/login-submit', UserController.handleLogin); //don't authenticate users logging in

//logout
router.post('/logout', UserController.handleLogout);

export default router;