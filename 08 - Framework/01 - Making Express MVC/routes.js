const Express = require("express");
const Router = Express.Router();
const checkSession = require('./middlewares/auth.middlewares')
const usersController = require("./controllers/users.controller");
const dashboardController = require('./controllers/dashboard.controller')

Router.get("/login", usersController.viewLogin);
Router.get("/register", usersController.viewRegister);
Router.get("/logoff", usersController.postLogoff);

Router.post("/register", usersController.postRegister);
Router.post("/login", usersController.postLogin)

Router.post("/logout", usersController.postLogoff)

Router.get("/dashboard", checkSession ,dashboardController.viewDashboard)

module.exports = Router;