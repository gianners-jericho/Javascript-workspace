const mysql = require("mysql2");
const config = require("../config");

class Model {

    constructor() {
        // Automatic database connection for the children
        this.connection = mysql.createConnection(config);

        // A check to see if we have properly connected to the right database
        this.connection.connect(function(error) {
            if (error) {
                console.log(`Database connection failed: ${error}`);
                return;
            }
        });
    }

    // Query function for the children to inherit and build queries with
    query(sql, values, callback) {
        this.connection.query(sql, values, function(error, results) {
            if (error) {
                callback(error, null);
                return;
            }

            callback(null, results);
        });
    }
}

module.exports = Model;