const db = require('../db')

class CarController {
    async findAll() {
        const rows = await db.promise().query("SELECT * FROM cars");
        return rows[0];
    }
}

module.exports = new CarController;