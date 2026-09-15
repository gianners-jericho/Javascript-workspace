import pool from '../config/db.js';

export default class Model {
  // Central query runner with built-in profiling 
  async executeQuery(query, params = [], profiler = null) {
    const start = Date.now();
    const [result] = await pool.execute(query, params);
    const duration = Date.now() - start;

    if (profiler) {
      profiler.logQuery(query, params, duration);
    }

    return result;
  }

  //refactored helper methods to use executeQuery
  // Common method for queries returning multiple records
  async fetchAll(query, params = [], profiler = null) {
    return await this.executeQuery(query, params, profiler);
  }

  // Common method for queries returning a single record
  async fetchOne(query, params = [], profiler = null) {
    const rows = await this.executeQuery(query, params, profiler);
    return rows[0];
  }

  // Generic execution method for INSERT / UPDATE / DELETE
  async execute(query, params = [], profiler = null) {
    return await this.executeQuery(query, params, profiler);
  }
};