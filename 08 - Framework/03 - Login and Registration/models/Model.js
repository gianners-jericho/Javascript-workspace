const mysql = require("mysql2");
const config = require("../config");

class Model {

    constructor() {
        // Automatic database connection for the children
        this.connection = mysql.createConnection(config);
        this.connection.connect();
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