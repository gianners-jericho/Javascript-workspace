const express = require("express");

const Router = express.Router();

const UserController = require("./controllers/users");

Router.get("/", UserController.index);

module.exports = Router;    