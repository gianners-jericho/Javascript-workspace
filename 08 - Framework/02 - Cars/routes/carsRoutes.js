const express = require('express');

const router = express.Router();

const CarsController = require('../controllers/carsController');

//get all the cars
router.get('/', CarsController.viewCars);

//reset visits
router.get('/reset', CarsController.reserVisit);

module.exports = router;