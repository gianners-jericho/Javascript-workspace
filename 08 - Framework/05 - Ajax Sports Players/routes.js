const express = require("express");
const router = express.Router();
const playersController = require("./controllers/players");

router.get("/search", playersController.search);

module.exports = router;