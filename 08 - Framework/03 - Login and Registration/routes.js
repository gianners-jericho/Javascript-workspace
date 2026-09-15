const express = require("express");
const Router = express.Router();

const StudentsController = require("./controllers/students");

Router.get("/", StudentsController.index);
Router.get("/students/profile", StudentsController.profile);

module.exports = Router;