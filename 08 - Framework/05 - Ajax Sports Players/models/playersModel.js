import Model from '../models/model.js';

class PlayerModel extends Model {
  async searchPlayers(filters, profiler = null) {
    let query = 'SELECT * FROM players WHERE 1=1';
    const params = [];

    // Filter by Name (like search)
    if (filters.name && filters.name.trim() !== '') {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name.trim()}%`);
    }

    // Filter by Gender (checkbox array or single value)
    if (filters.gender && filters.gender.length > 0) {
      const genders = Array.isArray(filters.gender) ? filters.gender : [filters.gender];
      query += ` AND gender IN (${genders.map(() => '?').join(',')})`;
      params.push(...genders);
    }

    // Filter by Sports (checkbox array or single value)
    if (filters.sports && filters.sports.length > 0) {
      const sports = Array.isArray(filters.sports) ? filters.sports : [filters.sports];
      query += ` AND sport IN (${sports.map(() => '?').join(',')})`;
      params.push(...sports);
    }

    return await this.fetchAll(query, params, profiler);
  }
}

export default new PlayerModel();