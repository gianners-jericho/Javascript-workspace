import pool from '../config.js';
import Profiler from '../classes/Profiler.js';

export class Model {
    static pool = pool;

    //executes a sql query captures execution time and records it to the profiler
    static async execute(query, params = []) {
        const start = performance.now();
        try {
            const result = await this.pool.execute(query, params);
            const duration = performance.now() - start;
            Profiler.recordQuery(query, params, duration);
            return result;
        } catch (error) {
            const duration = performance.now() - start;
            Profiler.recordQuery(query, params, duration);
            throw error;
        }
    }

    static async query(query, params = []) {
        return await this.execute(query, params);
    }

    static async fetchAll(query, params = []) {
        const [rows] = await this.execute(query, params);
        return rows;
    }

    static async findAll(query, params = []) {
        const [rows] = await this.execute(query, params);
        return rows;
    }

    static async findOne(sql, params = []) {
        const [rows] = await this.execute(sql, params);
        return rows.length > 0 ? rows[0] : null;
    }
}

export default Model;
