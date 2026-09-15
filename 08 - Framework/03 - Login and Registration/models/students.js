const Model = require("./Model");

class StudentsModel extends Model {

    // A function to find the email
    findByEmail(email, callback) {
        
        // Query for finding the email in the database
        const sql = "SELECT * FROM students WHERE email = ?";

        // Query execution
        this.query(sql, [email], function(error, results) {

            if (error) {
                callback(error, null);
                return;
            }

            callback(null, results[0]);
        });
    }
}

module.exports = StudentsModel;