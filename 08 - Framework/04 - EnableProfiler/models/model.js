const mysql = require('mysql2/promise');

const config = require('../config');

class Model {

    constructor() {
        //A pool opens a connection only when a query needs one
        this.connection = mysql.createPool(config.database);
    }

    //Every model inherits this, so the query code is written only once
    async query(sql, values = []) {
        const [rows] = await this.connection.execute(sql, values);

        return rows;
    }
}

module.exports = Model;
