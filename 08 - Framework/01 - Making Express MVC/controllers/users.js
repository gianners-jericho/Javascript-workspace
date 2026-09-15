const UserModel = require("../models/users");

class UserController {
    static index(req, res) {
        const UserModel = new UserModel();

        const users = UserModel.getUsers();

        res.render("users", {
            users: users
        });
    }
}

module.exports = UserController;