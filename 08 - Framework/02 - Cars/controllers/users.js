// Imports the users class
const UserModel = require("../models/users");

class UserController {

    static index(req, res) {

        // Instantiates the UserModel class
        const userModel = new UserModel();
        
        // Calls the getCars method from the UserModel class
        userModel.getCars(function(error, cars) {

            // If something went wrong, return an error
            if (error) {
                console.log(error);
                res.status(500).send("Database error");
                return;
            }

            // For checking pull results
            console.log(cars);
            // If all is well, then return the result
            res.render("index", {
                cars: cars
            });
        });
    }

}

module.exports = UserController;