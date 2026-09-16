const mysql = require("mysql2/promise");
const config = require("../config");

class Model {

    constructor() {
        // For auto connection to the database
        this.connection = mysql.createConnection(config);
        
        // Calls the checkConnection async function to run the log checks 
        this.checkConnection();

    }
    
    // Check logs for database connection 
    async checkConnection() {
        try{
            await this.connection;
            console.log(`Successfully connected to the ${process.env.DB_NAME} database!`);
        } catch (error) {
            console.log(`Database connection failed: ${error}`);
        }
    }

    // Async version for query handling function, adjusted so it no longer does callbacks 
    async query(sql, values) {
        const connection = await this.connection;

        const [results] = await connection.execute(sql, values);

        return results;
    }
}

let test = new Model();
module.exports = Model;