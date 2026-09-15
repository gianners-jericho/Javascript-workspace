const db = require('../db')

class SportModel {
    async findAll() {
        const result = await db.promise().query("SELECT * FROM sports");
        return result[0];
    }
}

module.exports = new SportModel;