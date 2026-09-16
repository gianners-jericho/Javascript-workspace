const express = require('express');
const router = express.Router();

const PlayerController = require('../controllers/playersController');

router.get('/', PlayerController.index);
router.get('/search', PlayerController.search);

module.exports = router;
