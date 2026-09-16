const mysql = require('mysql2');

const config = require('../config');

class Database {

    constructor(settings) {
        this.connection = mysql.createConnection(settings);
    }

    //Wrap the callback style query in a promise so the models can await it
    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, values, function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new Database(config.database);
