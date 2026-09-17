import Model from './model.js';

export class CarModel extends Model {
    static async findAll() {
        const query = `SELECT id, name, year, created_at FROM cars ORDER BY id ASC;`;
        return await this.fetchAll(query);
    }

    static async findById(id) {
        const sql = `SELECT id, name, year, created_at FROM cars WHERE id = ?`;
        return await this.findOne(sql, [id]);
    }

    static async create({ name, year }) {
        const sql = `INSERT INTO cars (name, year) VALUES (?, ?);`;
        return await this.query(sql, [name, year]);
    }
}

export default CarModel;