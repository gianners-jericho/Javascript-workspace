const Model = require("./Model");

class UserModel extends Model {

    // Function for getting all the cars data in the table
    getCars(callback){
        const sql = "SELECT * FROM cars";

        this.query(sql, function(error, results) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, results);
        });
    }
}

module.exports = UserModel;