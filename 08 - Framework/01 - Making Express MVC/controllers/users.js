class UserController {
    static index(req, res) {
        res.send("Hello from the User Controller");
    }
}

module.exports = UserController;