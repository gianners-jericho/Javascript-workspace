const express = require('express');
const router = express.Router();

const UserController = require('../controllers/usersController');
const isAuth = require('../middleware/authentication');

router.get('/', UserController.viewLoginRegister);
router.get('/students/profile', isAuth, UserController.viewWelcomePage);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logoff', UserController.logoff);

module.exports = router;