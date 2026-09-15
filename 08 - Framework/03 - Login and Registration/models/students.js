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

            // Returns the first result
            callback(null, results[0]);
        });
    }

    // For adding new students
    registerStudent(firstName, lastName, email, password, callback) {
        const sql =`
            INSERT INTO students
            (first_name, last_name, email, password)
            VALUES (?, ?, ?, ?)
        `;

        this.query(sql, [firstName, lastName, email, password], function(error, results) {
             
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, results);
        }); 
    }
}

module.exports = StudentsModel;