const Model = require("./Model");

class PlayersModel extends Model {

    // For finding players by name (partial match), gender, and/or sports.
    // All filters are optional as only the ones passed in get applied.
    async searchPlayers(filters) {
        const { name, gender, sports } = filters;

        // Joined with sports so each player's full sports list can be
        // returned, not just the sport they were searched by
        let sql = `
            SELECT players.id, players.name, players.gender,
                   GROUP_CONCAT(DISTINCT sports.sport_name) AS sports
            FROM players
            JOIN player_sports ON player_sports.player_id = players.id
            JOIN sports ON sports.id = player_sports.sport_id
            WHERE 1 = 1
        `;

        const values = [];

        // Partial name match
        if (name) {
            sql += " AND players.name LIKE ?";
            values.push(`%${name}%`);
        }

        if (gender) {
            sql += " AND players.gender = ?";
            values.push(gender);
        }

        // Only includes players who play at least one selected sport.
        // Kept as a subquery so the GROUP_CONCAT above still shows each
        // player's complete sports list, not just the matched sport
        if (sports && sports.length > 0) {
            const placeholders = sports.map(() => "?").join(", ");
            sql += ` AND players.id IN (
                SELECT player_id FROM player_sports
                JOIN sports ON sports.id = player_sports.sport_id
                WHERE sports.sport_name IN (${placeholders})
            )`;
            values.push(...sports);
        }

        sql += " GROUP BY players.id";

        // Returns an array of rows since search can match multiple players
        return await this.query(sql, values);
    }

}

module.exports = PlayersModel;