const mysql = require("mysql");
const config = require("../config");

class Model {
    constructor() {
        // For establishing the sql connection so that all that inherit from it automatically connects to the DB
        this.connection = mysql.createConnection(config);
        this.connection.connect();
    }

    // Query callback function for sql queries
    query(sql, callback) {
        this.connection.query(sql, function(error, results) {

            // If something goes wrong, give an error message
            if (error) {
                callback(error, null);
                return;
            }

            // If all went well, give the results
            callback(null, results);
        });
    }
}

module.exports = Model;