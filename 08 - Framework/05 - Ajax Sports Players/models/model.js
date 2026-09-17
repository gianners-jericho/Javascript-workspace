//import database connection pool
import pool from '../config.js';

export class Model {
    static pool = pool;

    //execute a query with optional parameters
    static async query(sql, params = []) {
        const [rows] = await this.pool.execute(sql, params);
        return rows;
    }
}

export default Model;
