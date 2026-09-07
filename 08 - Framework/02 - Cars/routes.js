const express = require('express');
const router = express.Router();

const carController = require('./controllers/cars.controller')

router.get('/', carController.home);

module.exports = router;