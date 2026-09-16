const mysql = require("mysql2/promise");
const config = require("../config");

class Model {

    constructor() {
        // For auto connection to the database
        this.connection = mysql.createConnection(config);

        // Check logs for database connection 
        this.connection.then(function(connection) {
            console.log(`Successfully connected to the ${process.env.DB_NAME} database!`);
        }).catch(function(error) {
            console.log(`Database connection failed: ${error}`);
        });
    }

    // Async version for query handling function 
    async query(sql, values) {
        const [results] = await this.connection.then(function(connection) {
            return connection.execute(sql, values);
        });

        return results;
    }
}

module.exports = Model;