const express = require('express');

const router = express.Router();

//routes.js only knows which controller method answers which url
const UserController = require('./controllers/users');

//LOGIN ROUTES
router.get('/', UserController.viewLoginPage);
router.post('/login', UserController.processLogin);

//REGISTER ROUTES
router.get('/register', UserController.viewRegisterPage);
router.post('/register', UserController.processRegister);

//WELCOME ROUTE
router.get('/welcome', UserController.viewWelcomePage);

//LOGOFF ROUTE
router.get('/logoff', UserController.processLogoff);

module.exports = router;
