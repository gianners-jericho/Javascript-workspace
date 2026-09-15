const express = require("express");
const Router = express.Router();

const StudentsController = require("./controllers/students");

Router.get("/", StudentsController.index);
Router.get("/students/profile", StudentsController.profile);
Router.post("/students/login", StudentsController.login);
Router.post("/students/register", StudentsController.regiser);

module.exports = Router;