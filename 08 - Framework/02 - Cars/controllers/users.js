// Imports the users class
const UserModel = require("../models/users");

class UserController {

    static index(req, res) {

        // Instantiates the UserModel class
        const userModel = new UserModel();
        
        // Nested the getCars into the countCars so that no overlap will happen and we only need to use one render call
        userModel.countCars(function(error, count) {
            // If something went wrong, return an error
            if (error) {
                console.log(error);
                res.status(500).send("Database error");
                return;
            }

            // For checking pull results
            console.log(count);

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
                    count: count,
                    cars: cars
                });
            });
        });        
    }
}

module.exports = UserController;