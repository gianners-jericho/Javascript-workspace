const express = require("express");
const Router = express.Router();

const StudentsController = require("./controllers/students");

Router.get("/", StudentsController.index);
Router.get("/students/profile", StudentsController.profile);
Router.get("/students/login", StudentsController.login);
Router.get("/students/register", StudentsController.regiser);

module.exports = Router;