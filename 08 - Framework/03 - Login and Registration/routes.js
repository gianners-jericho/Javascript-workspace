const Express = require("express");
const Router = Express.Router();

const StudentsController = require("./controllers/students");

Router.get("/", StudentsController.index);

Router.post("/students/login", StudentsController.login);

Router.post("/students/register", StudentsController.register);

Router.get("/students/profile", StudentsController.profile);

Router.post("/students/logout", StudentsController.logout);

module.exports = Router;