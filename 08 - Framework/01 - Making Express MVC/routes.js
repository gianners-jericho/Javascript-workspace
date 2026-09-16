const Express = require("express");
const Router = Express.Router();
const checkSession = require('./middlewares/auth.middlewares')
const usersController = require("./controllers/users.controller");
const dashboardController = require('./controllers/dashboard.controller')

// App
Router.get("/login", usersController.viewLogin);
Router.get("/register", usersController.viewRegister);
Router.get("/dashboard", checkSession ,dashboardController.viewDashboard);

// API
Router.get("/logoff", usersController.postLogoff);
Router.post("/register", usersController.postRegister);
Router.post("/login", usersController.postLogin);
Router.post("/logout", usersController.postLogoff);


module.exports = Router;