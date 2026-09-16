const carController = require('./controllers/cars.controller');
const express = require('express');
const router = express.Router();

router.get('/', carController.home);

module.exports = router;