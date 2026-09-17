import pool from '../config.js';

export class Model {
    static pool = pool;

    static async query(query, params = []){
        return await this.pool.execute(query, params);
    }

    static async fetchAll(query, params = []){
        const [rows] = await this.pool.execute(query, params);
        return rows;
    }

    static async findAll(query, params = []){
        const [rows] = await this.pool.execute(query, params);
        return rows;
    }

    static async findOne(sql, params = []){
        const [rows] = await this.pool.execute(sql, params);
        return rows.length > 0? rows[0] : null; //return null if more tha one result
    }
}

export default Model;
