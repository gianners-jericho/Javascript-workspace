const Model = require('./model');

class Player extends Model {

    //SEARCH: name is a partial match, gender and sports are the boxes that are checked
    async search(name, genders, sports) {

        //Nothing checked in a category means no player can qualify
        if (!genders.length || !sports.length) {
            return [];
        }

        const values = [];

        let sql = `
            SELECT players.id, players.name, players.gender, players.image,
                   GROUP_CONCAT(DISTINCT sports.sport_name ORDER BY sports.sport_name SEPARATOR ', ') AS sports
            FROM players
            JOIN player_sports ON player_sports.player_id = players.id
            JOIN sports ON sports.id = player_sports.sport_id
            WHERE 1 = 1
        `;

        if (name) {
            sql += ` AND players.name LIKE ?`;
            values.push(`%${name}%`);
        }

        //execute() wants one question mark per value, so the list is built here
        sql += ` AND players.gender IN (${genders.map(() => '?').join(', ')})`;
        values.push(...genders);

        //A subquery, so the sports column still shows every sport of the player
        sql += ` AND players.id IN (
                    SELECT player_id
                    FROM player_sports
                    JOIN sports ON sports.id = player_sports.sport_id
                    WHERE sports.sport_name IN (${sports.map(() => '?').join(', ')})
                 )`;
        values.push(...sports);

        sql += ` GROUP BY players.id ORDER BY players.name;`;

        return this.query(sql, values);
    }

    //LIST: the sport checkboxes are built from the sports table
    async allSports() {
        const rows = await this.query(
            `
            SELECT sport_name FROM sports ORDER BY sport_name;
            `
        );

        return rows.map(row => row.sport_name);
    }
}

module.exports = new Player();
