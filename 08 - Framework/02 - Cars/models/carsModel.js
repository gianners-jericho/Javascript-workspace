const database = require('./model');

class Cars {
    async getAll() {
        const rows = await database.query(
            `SELECT * FROM cars`
        );

        return rows;
    }
}

module.exports = new Cars();