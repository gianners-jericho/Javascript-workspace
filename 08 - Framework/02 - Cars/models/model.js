import pool from '../config/db.js';

export default class Model {
  // Common method for queries returning multiple records
  async fetchAll(query, params = []) {
    const [rows] = await pool.execute(query, params);
    return rows;
  }

  // Common method for queries returning a single record
  async fetchOne(query, params = []) {
    const [rows] = await pool.execute(query, params);
    return rows[0];
  }
};