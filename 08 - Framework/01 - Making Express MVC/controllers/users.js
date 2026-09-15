const UserModel = require("../models/users");

class UserController {
    static index(req, res) {
        const userModel = new UserModel();

        const users = userModel.getUsers();

        res.render("users", {
            users: users
        });
    }
}

module.exports = UserController;