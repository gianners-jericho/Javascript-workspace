const express = require('express');
const router = express.Router();

const UserController = require('../controllers/usersController');
const isAuth = require('../middleware/authentication');

router.get('/', UserController.viewLoginPage);
router.post('/login', UserController.login);
router.get('/users', isAuth, UserController.viewUserList);
router.get('/logoff', UserController.logoff);

module.exports = router;
