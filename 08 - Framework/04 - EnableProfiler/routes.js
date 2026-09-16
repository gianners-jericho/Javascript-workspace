const Express = require("express");
const Router = Express.Router();

const StudentsController = require("./controllers/students");

const { verifyRegistration, verifyLogin, verifyAuthentication } = require("./middleware/verification");

// Main page
Router.get("/", StudentsController.index);

// Registration
Router.post("/students/register", verifyRegistration, StudentsController.register);

// Login
Router.post("/students/login", verifyLogin, StudentsController.login);

// Profile
Router.get("/students/profile", verifyAuthentication, StudentsController.profile);

// Logout
Router.post("/students/logout", verifyAuthentication, StudentsController.logout);

module.exports = Router;