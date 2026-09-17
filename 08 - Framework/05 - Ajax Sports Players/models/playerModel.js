//import base model
import Model from './model.js';

export class PlayerModel extends Model {
    //search and filter players by name, genders, and sports
    static async search({ name = '', genders = [], sports = [] } = {}) {
        let sql = 'SELECT id, name, gender, sport, created_at FROM players';
        const conditions = [];
        const params = [];

        //filter by name substring if provided
        if (name && name.trim() !== '') {
            conditions.push('name LIKE ?');
            params.push(`%${name.trim()}%`);
        }

        //filter by selected genders
        if (Array.isArray(genders) && genders.length > 0) {
            conditions.push(`gender IN (${genders.map(() => '?').join(',')})`);
            params.push(...genders);
        }

        //filter by selected sports
        if (Array.isArray(sports) && sports.length > 0) {
            conditions.push(`sport IN (${sports.map(() => '?').join(',')})`);
            params.push(...sports);
        }

        //combine all conditions
        if (conditions.length > 0) {
            sql += ` WHERE ${conditions.join(' AND ')}`;
        }

        sql += ' ORDER BY name ASC;';

        return await this.query(sql, params);
    }
}

export default PlayerModel;
