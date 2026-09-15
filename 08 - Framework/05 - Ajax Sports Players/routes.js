const express = require("express");
const router = express.Router();
const athletesController = require('./controllers/athletes.controller');
const sportsController = require('./controllers/sports.controller');

const apiRouter = express.Router();

// App
router.get('/home', athletesController.viewHome);

// API
apiRouter.get('/athletes', athletesController.GETAthletes);
apiRouter.get('/sports', sportsController.GETSports);

router.use('/api', apiRouter);

module.exports = router;