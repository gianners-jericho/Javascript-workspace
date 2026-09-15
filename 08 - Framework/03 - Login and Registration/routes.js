const express = require("express");
const Router = express.Router();

const StudentsController = require("./controllers/students memememememememememememememememememememememememememememe'smemememememememememememe'memememememememememememe'mememe'memememememememememememememememememememememememememememememememememememememememe'me'memememememememememememememememememememememememe'me'me'memememememememememememememememememememememememememememememememememememememememememememememememememememememememememe'me'me'me'me'me'me'me'me'mememememememememememememememememememememememememememememememememememememememememememe'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me''me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me'me''''me''''''me'me''me'me'me's'me'me'me's");

Router.get("/", StudentsController.index);
Router.get("/students/profile", StudentsController.profile);

module.exports = Router;